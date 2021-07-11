

/* eslint require-await: "off"*/
const parseFile = async function (pathToFile, schema, optionsUser) {
    // Default options
    if (typeof optionsUser === "undefined" || optionsUser === null) {
        optionsUser = {};
    }
    // Obligate to do typeof optionsUser.separator !== "undefined" && optionsUser.separator !== null
    // Because if it's "false" -> optionsUser.nameOptions || true -> will be true
    const checkOptions = (value, defaultValue) => {
        if (typeof value !== "undefined" && value !== null) {
            return value;
        } else {
            return defaultValue;
        }
    };
    const options = {
        arrayParse: checkOptions(optionsUser.arrayParse, true),
        callBackForce: checkOptions(optionsUser.callBackForce, false),
        debug: checkOptions(optionsUser.debug, false),
        error: checkOptions(optionsUser.error, false),
        lineCallBack: checkOptions(optionsUser.lineCallBack, null),
        parse: checkOptions(optionsUser.parse, true),
        separator: checkOptions(optionsUser.separator, ","),
        privateSeparator: checkOptions(optionsUser.privateSeparator, "..."),
        overrideFirstLine: checkOptions(optionsUser.overrideFirstLine, false),
        avoidVoidLine: checkOptions(optionsUser.avoidVoidLine, false),
    };
    if (options.debug) {
        if (typeof schema !== "undefined" && schema !== null) {
            console.log("HAS SCHEMA");
        } else {
            console.log("NO SCHEMA");
        }
        console.log("OPTIONS", JSON.stringify(options));
        if (options.error === "no") {
            console.log("Useless informations : just use try catch if you don't want error :)");
        }
    }

    return new Promise((resolve) => {
        let lineReader;
        if (typeof pathToFile == "string") {

        } else if (Array.isArray(pathToFile)) {
            lineReader = pathToFile;
        }
        let rows = [];
        let lineCounter = 0;
        let firstLine = [];
        const finalJson = [];
        let lineBuffer = [];

        const createFieldsBinding = function (schemaObject, startPath = "") {
            let bindings = [];
            for (const oneElement in schemaObject) {
                if (Object.prototype.hasOwnProperty.call(schemaObject, oneElement)) {
                    const path = startPath === "" ? `${oneElement}` : `${startPath}${options.privateSeparator}${oneElement}`;
                    if (typeof schemaObject[oneElement] === "object" || Array.isArray(schemaObject[oneElement])) {
                        if (Array.isArray(schemaObject[oneElement])) {
                            bindings.push({
                                name: oneElement,
                                path: path,
                                type: "helper-array"
                            });
                        }
                        bindings = [
                            ...bindings,
                            ...createFieldsBinding(schemaObject[oneElement], path)
                        ];
                    } else {
                        if (Array.isArray(schemaObject) && options.arrayParse && firstLine.includes(schemaObject[oneElement])) {
                            bindings.push({
                                name: schemaObject[oneElement],
                                path: path,
                                value: "string"
                            });
                        } else {
                            if (firstLine.includes(oneElement) || typeof schemaObject[oneElement] === "function") {
                                bindings.push({
                                    name: oneElement,
                                    path: path,
                                    value: schemaObject[oneElement]
                                });
                            } else {
                                bindings.push({
                                    name: oneElement,
                                    path: path,
                                    type: "static",
                                    value: schemaObject[oneElement]
                                });
                            }
                        }
                    }
                }
            }
            return bindings;
        };

        const parseLine = async function (line) {
            let obj;
            if (options.debug) {
                // Debugger;
            }
            if (typeof schema !== "undefined" && schema !== null && Array.isArray(schema)) {
                obj = [];
            } else {
                obj = {};
            }
            const allValues = line.split(options.separator);
            for (const oneRow of rows) {
                const onePathRow = oneRow.path;
                const onePathName = oneRow.name;
                const allPath = onePathRow.split(options.privateSeparator);
                let currentValue = null;
                if (typeof oneRow.type === "undefined" || oneRow.type === null) {
                    const schemaValue = oneRow.value;
                    const index = firstLine.findIndex((element) => element === oneRow.name);
                    if (index === -1) {
                        currentValue = schemaValue;
                    } else {
                        currentValue = allValues[index] || "";
                    }
                    // Optionnal parse the value
                    if (options.parse === true) {
                        if (typeof schemaValue !== "undefined") {
                            if (schemaValue === "int") {
                                currentValue = parseInt(currentValue, 10);
                            } else if (schemaValue === "float") {
                                currentValue = parseFloat(currentValue);
                            } else if (schemaValue === "string") {
                                currentValue = currentValue.toString();
                            } else if (typeof schemaValue === "function") {
                                if (typeof currentValue === "function") {
                                    // When the value is in an array
                                    currentValue = await schemaValue(allValues);
                                } else {
                                    currentValue = await schemaValue(currentValue);
                                }
                            }
                        }
                    }
                } else if (oneRow.type === "helper-array") {
                    // This bug was hard !
                    // We can do currentValue = oneRow.value; for helper-array
                    // Because it's a reference and not a static value, lol, I'm dumb
                    currentValue = [];
                } else if (oneRow.type === "static") {
                    currentValue = oneRow.value;
                }
                let goodPlace = null;
                if (allPath.length > 1) {
                    goodPlace = obj;
                    const long = allPath.length;
                    for (let count = 0; count < long; count++) {
                        const nextPath = allPath[count];
                        if (count === long - 1) {
                            if (!Array.isArray(goodPlace)) {
                                goodPlace[nextPath] = "";
                            }
                        } else {
                            if (typeof goodPlace[nextPath] === "undefined") {
                                goodPlace[nextPath] = {};
                            }
                            goodPlace = goodPlace[nextPath];
                        }
                    }
                    if (goodPlace) {
                        if (Array.isArray(goodPlace)) {
                            goodPlace.push(currentValue);
                        } else if (typeof goodPlace === "object") {
                            goodPlace[onePathName] = currentValue;
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
        const clearBuffer = async () => {
            for (const oneLine of lineBuffer) {
                let parsedLine = {};
                if (options.avoidVoidLine === true) {
                    if (oneLine === "" || oneLine === "\n" || oneLine === "\r\n") {
                        continue;
                    }
                }
                parsedLine = await parseLine(oneLine);
                if (typeof options.lineCallBack !== "undefined" && typeof options.lineCallBack === "function") {
                    const resCallback = await options.lineCallBack(parsedLine, oneLine);
                    if (typeof resCallBack === "undefined" && resCallback === null) {
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
        };
        const parsefirstLine = async (line) => {
            if (typeof options.overrideFirstLine !== "undefined" && options.overrideFirstLine !== null && Array.isArray(options.overrideFirstLine)) {
                firstLine = options.overrideFirstLine; // check if same length ?
            } else {
                firstLine = line.split(options.separator);
            }
            if (typeof schema !== "undefined" && schema !== null) {
                rows = createFieldsBinding(schema);
                if (options.debug) {
                    console.log("BINDINGS:", JSON.stringify(rows));
                }
            } else {
                // There is no schema
                rows = firstLine.map((element) => ({
                    name: element,
                    path: element
                }));
            }
        };
        const reader = async () => {
            for await (const line of lineReader) {
                if (lineCounter === 0) {
                    lineCounter++;
                    await parsefirstLine(line);
                } else {
                    lineBuffer.push(line);
                    await clearBuffer();
                }
            }
            resolve(finalJson);
        }
        reader();
    });
};

export default parseFile;
