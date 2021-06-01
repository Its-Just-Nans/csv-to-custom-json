const fs = require("fs");
const { parse } = require("path");
const readline = require("readline");

const parseFile = async function (pathToFile, schema, optionsUser) {
    // default options
    if (typeof optionsUser === "undefined" || optionsUser === null) {
        optionsUser = {};
    }
    // obligate to do typeof optionsUser.separator !== "undefined" && optionsUser.separator !== null
    // because if it's "false" -> optionsUser.nameOptions || true -> will be true
    const options = {
        separator: typeof optionsUser.separator !== "undefined" && optionsUser.separator !== null ? optionsUser.separator : ",",
        lineCallBack: typeof optionsUser.lineCallBack !== "undefined" && optionsUser.lineCallBack !== null ? optionsUser.lineCallBack : null,
        parse: typeof optionsUser.parse !== "undefined" && optionsUser.parse !== null ? optionsUser.parse : true,
        debug: typeof optionsUser.debug !== "undefined" && optionsUser.debug !== null ? optionsUser.debug : false,
    };
    return new Promise((resolve, reject) => {
        const lineReader = readline.createInterface({
            input: fs.createReadStream(pathToFile),
            crlfDelay: Infinity,
        });
        let rows = [];
        let lineCounter = 0;
        let firstLine = [];
        let finalJson = [];
        let lineBuffer = [];
        lineReader.on("line", async (line) => {
            lineReader.pause();
            if (lineCounter == 0) {
                firstLine = line.split(options.separator);
                if (typeof schema !== "undefined" && schema !== null) {
                    rows = createFieldsBinding(schema);
                    if (options.debug) {
                        console.log("BINDINGS:", JSON.stringify(rows));
                    }
                } else {
                    // no schema
                    const parts = line.split(options.separator);
                    rows = parts.map((element) => {
                        return {
                            name: element,
                            path: element,
                        };
                    });
                }
                lineCounter++;
            } else {
                lineBuffer.push(line);
            }
        });
        lineReader.on("close", async () => {
            resolve(finalJson);
        });
        lineReader.on("pause", async () => {
            for (let oneLine of lineBuffer) {
                let parsedLine = await parseLine(oneLine);
                if (typeof options.lineCallBack !== "undefined" && typeof options.lineCallBack == "function") {
                    let resCallback = await options.lineCallBack(parsedLine, oneLine);
                    if (typeof resCallBack !== "undefined" && resCallback !== null) {
                        parsedLine = resCallback;
                    }
                }
                finalJson.push(parsedLine);
            }
            lineBuffer = []; // clearBuffer
            lineReader.resume();
        });
        const createFieldsBinding = function (schema, startPath = "") {
            //TODO arrange order
            let bindings = [];
            for (let oneElement in schema) {
                const path = startPath == "" ? `${oneElement}` : `${startPath}.${oneElement}`;
                if (typeof schema[oneElement] == "object" || Array.isArray(schema[oneElement])) {
                    // bindings.push({
                    //     name: oneElement,
                    //     path: path,
                    // });
                    bindings = [...bindings, ...createFieldsBinding(schema[oneElement], path)];
                } else {
                    bindings.push({
                        name: oneElement,
                        path: path,
                    });
                }
            }
            return bindings;
        };

        const parseLine = async function (line) {
            let obj = {};
            allValues = line.split(options.separator);
            let count = 0;
            for (const oneRow of rows) {
                const index = firstLine.findIndex((element) => {
                    return element == oneRow.name;
                });
                if (index === -1) {
                    throw "ERROR";
                }
                let currentValue = allValues[index];
                const onePathRow = oneRow.path;
                const onePathName = oneRow.name;
                const allPath = onePathRow.split(".");
                // optionnale parse the value
                if (options.parse == true) {
                    if (typeof schema !== "undefined" && schema !== null) {
                        let schemaValue;
                        if (allPath.length > 1) {
                            schemaValue = schema;
                            for (let onePath of allPath) {
                                schemaValue = schemaValue[onePath];
                            }
                        } else {
                            schemaValue = schema[onePathRow];
                        }
                        if (typeof schemaValue !== "undefined") {
                            if (schemaValue == "int") {
                                currentValue = parseInt(currentValue, 10);
                            } else if (schemaValue === "float") {
                                currentValue = parseFloat(currentValue);
                            } else if (schemaValue === "string") {
                                currentValue = currentValue.toString();
                            } else if (typeof schemaValue === "function") {
                                currentValue = await schemaValue(currentValue);
                            }
                        }
                    }
                }
                let goodPlace;
                if (allPath.length > 1) {
                    goodPlace = obj;
                    const long = allPath.length;
                    for (let count = 0; count < long; count++) {
                        const nextPath = allPath[count];
                        if (count == long - 1) {
                            goodPlace[nextPath] = "";
                        } else {
                            if (typeof goodPlace[nextPath] === "undefined") {
                                goodPlace[nextPath] = {};
                            }
                            goodPlace = goodPlace[nextPath];
                        }
                    }
                    if (goodPlace) {
                        if (typeof goodPlace === "object") {
                            goodPlace[onePathName] = currentValue;
                        } else {
                            // need to be an array
                            //TODO arrange order
                            const temp = goodPlace;
                            goodPlace = [];
                            goodPlace.push(temp);
                            goodPlace.push(currentValue);
                        }
                    } else {
                        goodPlace = currentValue;
                    }
                } else {
                    obj[onePathRow] = currentValue;
                }
            }
            return obj;
        };
    });
};

module.exports = parseFile;
