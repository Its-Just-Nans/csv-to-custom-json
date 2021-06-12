const parseFile = require("./index");

/* eslint no-unused-expressions: "off"*/
/* eslint sort-keys: "off"*/
/* eslint require-await: "off"*/

// Output params
const doLog = true;
let woaw = true;
woaw = false;

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
        Debug: true
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple.csv";
    doLog ? console.log(`- No schema \n"${linkFile}"`) : "";
    return parseFile(linkFile);
});
allFunc.push(async () => {
    const linkFile = "test/simple.csv";
    doLog ? console.log(`- No schema but options \n"${linkFile}"`) : "";
    return parseFile(linkFile, null, { error: "no" });
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
        num2(item) {
            return `callBack${item}`;
        },
        num3: ""
    };
    return parseFile(linkFile, schema);
});
allFunc.push(async () => {
    const linkFile = "test/simple.csv";
    doLog ? console.log(`- CallBack on item with async callBack \n"${linkFile}"`) : "";
    const schema = {
        num1: "",
        async num2(item) {
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(`callBack${item}`);
                }, 500);
                // Only 500 ms because the test will be too long :/
            });
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
    return parseFile(linkFile, schema);
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
    return parseFile(linkFile, schema);
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
        hello2: [
            {
                num4: "int",
                num1: [
                    {
                        num3: "string"
                    }
                ]
            }
        ]
    };
    return parseFile(linkFile, schema);
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
        hello2: [
            [
                {
                    num3: "string"
                }
            ]
        ]
    };
    return parseFile(linkFile, schema);
});
allFunc.push(async () => {
    const linkFile = "test/simple_complexe.csv";
    doLog ? console.log(`- Array in object\n"${linkFile}"`) : "";
    const schema = {
        hello: [
            {
                num4: "int",
                num1: "string"
            }
        ],
        hello2: [
            {
                num4: "int",
                num3(value) {
                    return `hey${value}`;
                },
                num1: [
                    "num4",
                    "text",
                    function (allValues) {
                        return `toto${allValues.toString()}`;
                    },
                    () => "arrow"
                ]
            }
        ]
    };
    return parseFile(linkFile, schema, {
        debug: true
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple_complexe.csv";
    doLog ? console.log(`- Array \n"${linkFile}"`) : "";
    const schema = {
        num1: [
            "num4",
            "text",
            function (allValues) {
                return `toto${allValues.toString()}`;
            },
            () => "arrow"
        ]
    };
    return parseFile(linkFile, schema, {
        debug: "max"
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple_complexe.csv";
    doLog ? console.log(`- Array schema \n"${linkFile}"`) : "";
    const schema = [
        "num4",
        "text",
        function (allValues) {
            return `toto${allValues.toString()}`;
        },
        () => "arrow"
    ];
    return parseFile(linkFile, schema, {
        debug: true
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple_complexe.csv";
    doLog ? console.log(`- Array schema with an object \n"${linkFile}"`) : "";
    const schema = [
        "num4",
        "text",
        function (allValues) {
            return `toto${allValues.toString()}`;
        },
        () => "arrow",
        {
            staticValue: "value",
            num1: "int"
        }
    ];
    return parseFile(linkFile, schema, {
        debug: true
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple_complexe.csv";
    doLog ? console.log(`- Array schema with an object and an array\n"${linkFile}"`) : "";
    const schema = [
        "num4",
        "text",
        [
            "arrayHereLol",
            [
                "andHereLol",
                {
                    obj: "lol",
                    num4: "int"
                }
            ]
        ],
        function (allValues) {
            return `toto${allValues.toString()}`;
        },
        () => "arrow",
        {
            staticValue: "value",
            num1: "int"
        }
    ];
    return parseFile(linkFile, schema, {
        debug: true
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple_complexe.csv";
    doLog ? console.log(`- Use private internal separator\n"${linkFile}"`) : "";
    const schema = {
        num4: {
            num1: "string",
            "num1...": "string",
            num2: "string",
            num3: "int",
            hello4: (value) => {
                return `The number 4 is ${value}`;
            }
        }
    };
    // "num1..." will be not deisplayed
    return parseFile(linkFile, schema, {
        debug: true,
        privateSeparator: "...." // we change the privateSeparator to four points (it can be any string)
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple_complexe.csv";
    doLog ? console.log(`- Overide the first line\n"${linkFile}"`) : "";
    const newFirstLine = ["hello1", "hello2", "hello3", "hello4"];
    const schema = {
        num4: {
            num4: "string",
            hello1: "string",
            hello2: "int",
            hello3: "float",
            hello4: (value) => {
                return `The number 4 is ${value}`;
            }
        }
    };
    return parseFile(linkFile, schema, {
        overideFirstLine: newFirstLine,
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
