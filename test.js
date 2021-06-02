const parseFile = require("./index");

/* eslint no-unused-expressions: "off"*/
/* eslint sort-keys: "off"*/
/* eslint require-await: "off"*/

// Output params
const doLog = true;
const woaw = false;

const allFunc = [];

allFunc.push(async () => {
    const linkFile = "test/simple.csv";
    doLog ? console.log(`- Normal \n"${linkFile}"`) : "";
    const schema = {
        num1: "",
        num2: "",
        num3: ""
    };
    return parseFile(linkFile, schema);
});
allFunc.push(async () => {
    const linkFile = "test/simple.csv";
    doLog ? console.log(`- Normal with debug output \n"${linkFile}"`) : "";
    const schema = {
        num1: "",
        num2: "",
        num3: ""
    };
    return parseFile(linkFile, schema, {
        debug: true
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple.csv";
    doLog ? console.log(`- No schema \n"${linkFile}"`) : "";
    return parseFile(linkFile);
});
allFunc.push(async () => {
    const linkFile = "test/simple_customSeparator.csv";
    doLog ? console.log(`Custom Separator "${linkFile}"`) : "";
    const schema = {
        num1: "",
        num2: "",
        num3: ""
    };
    return parseFile(linkFile, schema, {
        separator: ";"
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple.csv";
    doLog ? console.log(`- CallBack on item \n"${linkFile}"`) : "";
    const schema = {
        num1: "",
        num2 (item) {
            return `callBack${item}`;
        },
        num3: ""
    };
    return parseFile(linkFile, schema);
});
allFunc.push(async () => {
    const linkFile = "test/simple.csv";
    doLog ? console.log(`- CallBack after line \n"${linkFile}"`) : "";
    const schema = {
        num1: "",
        num2: "",
        num3: ""
    };
    return parseFile(linkFile, schema, {
        lineCallBack: async (parsedLine, sourceLine) => {
            doLog ? console.log(JSON.stringify(parsedLine), sourceLine, "lineCallBack") : null;
        }
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple.csv";
    doLog ? console.log(`- Parse Value (default) \n"${linkFile}"`) : "";
    const schema = {
        num1: "int",
        num2: "float",
        num3: "string"
    };
    return parseFile(linkFile, schema);
});
allFunc.push(async () => {
    const linkFile = "test/simple.csv";
    doLog ? console.log(`- Don't parse Value (force) \n"${linkFile}"`) : "";
    const schema = {
        num1: "int",
        num2: "float",
        num3: "string"
    };
    return parseFile(linkFile, schema, {
        parse: false
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple_complexe.csv";
    doLog ? console.log(`- More complexe structure \n"${linkFile}"`) : "";
    const schema = {
        num1: {
            num4: ""
        },
        num2: "",
        num3: ""
    };
    return parseFile(linkFile, schema);
});
allFunc.push(async () => {
    const linkFile = "test/simple_complexe.csv";
    doLog ? console.log(`- More complexe double same name \n"${linkFile}"`) : "";
    const schema = {
        num1: {
            num4: {
                num4: "string"
            }
        },
        num2: "",
        num3: ""
    };
    return parseFile(linkFile, schema);
});
allFunc.push(async () => {
    const linkFile = "test/simple_complexe.csv";
    doLog ? console.log(`- More complexe struct \n"${linkFile}"`) : "";
    const schema = {
        hello: {
            uno: {
                dos: {
                    tres: {
                        num4: "string"
                    }
                }
            }
        },
        bonjour: {
            un: {
                deux: {
                    trois: {
                        num2: "string",
                        num1: "int"
                    }
                }
            }
        },
        num3: ""
    };
    return parseFile(linkFile, schema, {
        debug: true
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple_complexe.csv";
    doLog ? console.log(`- Array \n"${linkFile}"`) : "";
    const schema = {
        hello: [
            {
                num4: "int",
                num1: "string"
            }
        ],
        num3: ""
    };
    return parseFile(linkFile, schema, {
        debug: true
    });
});

(async () => {
    for (const oneTestFunc of allFunc) {
        doLog ? console.log("------------------") : null;
        const res = await oneTestFunc();
        doLog ? console.log(woaw ? JSON.stringify(res, null, 4) : JSON.stringify(res)) : null;
    }
    console.log("------------------");
    console.log("OK");
})();
