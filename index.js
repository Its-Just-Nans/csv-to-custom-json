const fs = require("fs");
const readline = require("readline");

/* eslint require-await: "off"*/
const parseFile = async function (pathToFile, schema, optionsUser) {
    // Default options
    if (typeof optionsUser === "undefined" || optionsUser === null) {
        optionsUser = {};
    }
    // Obligate to do typeof optionsUser.separator !== "undefined" && optionsUser.separator !== null
    // Because if it's "false" -> optionsUser.nameOptions || true -> will be true
    const options = {
        callBackForce: typeof optionsUser.callBackForce !== "undefined" && optionsUser.callBackForce !== null ? optionsUser.callBackForce : false,
        debug: typeof optionsUser.debug !== "undefined" && optionsUser.debug !== null ? optionsUser.debug : false,
        error: typeof optionsUser.error !== "undefined" && optionsUser.error !== null ? optionsUser.error : false,
        lineCallBack: typeof optionsUser.lineCallBack !== "undefined" && optionsUser.lineCallBack !== null ? optionsUser.lineCallBack : null,
        parse: typeof optionsUser.parse !== "undefined" && optionsUser.parse !== null ? optionsUser.parse : true,
        separator: typeof optionsUser.separator !== "undefined" && optionsUser.separator !== null ? optionsUser.separator : ","
    };
    if (options.debug && options.customError === "no") {
        console.log("Look at him, he is ");
    }
    return new Promise((resolve) => {
        const lineReader = readline.createInterface({
            crlfDelay: Infinity,
            input: fs.createReadStream(pathToFile)
        });
        let rows = [];
        let lineCounter = 0;
        let firstLine = [];
        const finalJson = [];
        let lineBuffer = [];

        const createFieldsBinding = function (schemaObject, startPath = "") {
            // TODO arrange order
            let bindings = [];
            for (const oneElement in schemaObject) {
                if (Object.prototype.hasOwnProperty.call(schemaObject, oneElement)) {
                    const path = startPath === "" ? `${oneElement}` : `${startPath}.${oneElement}`;
                    if (typeof schemaObject[oneElement] === "object" || Array.isArray(schemaObject[oneElement])) {
                        if (Array.isArray(schemaObject[oneElement])) {
                            bindings.push({
                                name: oneElement,
                                path,
                                type: "helper-array"
                            });
                        }
                        bindings = [
                            ...bindings,
                            ...createFieldsBinding(schemaObject[oneElement], path)
                        ];
                    } else {
                        bindings.push({
                            name: oneElement,
                            path
                        });
                    }
                }
            }
            return bindings;
        };

        const parseLine = async function (line) {
            const obj = {};
            const allValues = line.split(options.separator);
            for (const oneRow of rows) {
                const onePathRow = oneRow.path;
                const onePathName = oneRow.name;
                const allPath = onePathRow.split(".");
                let currentValue;
                if (typeof oneRow.type === "undefined") {
                    const index = firstLine.findIndex((element) => element === oneRow.name);
                    if (index === -1) {
                        if (options.debug && options.error === "custom") {
                            console.log("how");
                        } else if (options.debug && options.error === "no") {
                            resolve(finalJson);
                        }
                        throw Error("ERROR");
                    }
                    currentValue = allValues[index];
                    // Optionnal parse the value
                    if (options.parse === true) {
                        if (typeof schema !== "undefined" && schema !== null) {
                            let schemaValue;
                            if (allPath.length > 1) {
                                schemaValue = schema;
                                for (const onePath of allPath) {
                                    schemaValue = schemaValue[onePath];
                                }
                            } else {
                                schemaValue = schema[onePathRow];
                            }
                            if (typeof schemaValue !== "undefined") {
                                if (schemaValue === "int") {
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
                } else {
                    currentValue = [];
                }
                let goodPlace;
                if (allPath.length > 1) {
                    goodPlace = obj;
                    const long = allPath.length;
                    for (let count = 0; count < long; count++) {
                        const nextPath = allPath[count];
                        if (count === long - 1) {
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
                            // Need to be an array
                            // TODO arrange order
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

        lineReader.on("line", (line) => {
            lineReader.pause();
            if (lineCounter === 0) {
                firstLine = line.split(options.separator);
                if (typeof schema !== "undefined" && schema !== null) {
                    rows = createFieldsBinding(schema);
                    if (options.debug) {
                        console.log("BINDINGS:", JSON.stringify(rows));
                    }
                } else {
                    // There is no schema
                    const parts = line.split(options.separator);
                    rows = parts.map((element) => ({
                        name: element,
                        path: element
                    }));
                }
                lineCounter++;
            } else {
                lineBuffer.push(line);
            }
        });
        lineReader.on("close", () => {
            resolve(finalJson);
        });
        lineReader.on("pause", async () => {
            for (const oneLine of lineBuffer) {
                let parsedLine = await parseLine(oneLine);
                if (typeof options.lineCallBack !== "undefined" && typeof options.lineCallBack === "function") {
                    const resCallback = await options.lineCallBack(parsedLine, oneLine);
                    if (typeof resCallBack !== "undefined" && resCallback !== null) {
                        if (options.callBackForce) {
                            parsedLine = resCallback;
                        } else {
                            if (options.debug) {
                                console.error("CallBack force at false and callBack result is not correct");
                            }
                        }
                    }
                }
                finalJson.push(parsedLine);
            }
            lineBuffer = []; // Clear the buffer
            lineReader.resume();
        });
    });
};

module.exports = parseFile;
