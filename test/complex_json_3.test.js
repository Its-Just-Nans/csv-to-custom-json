const parseFile = require("../index");
const path = require("path");

const test = async (doLog) => {
    const linkFile = "./simple_complexe.csv";
    const link = path.join(__dirname, linkFile);
    if (doLog != false) {
        console.log(`- More complexe structure with same name - ${path.basename(__filename)} - "${linkFile}"`);
    }
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
    return parseFile(link, schema);
};

const result = [
    {
        "hello": {
            "uno": {
                "dos": {
                    "tres": {
                        "num4": "4"
                    }
                }
            }
        },
        "bonjour": {
            "un": {
                "deux": {
                    "trois": {
                        "num2": "2",
                        "num1": 1
                    }
                }
            }
        },
        "num3": "3"
    },
    {
        "hello": {
            "uno": {
                "dos": {
                    "tres": {
                        "num4": "7"
                    }
                }
            }
        },
        "bonjour": {
            "un": {
                "deux": {
                    "trois": {
                        "num2": "5",
                        "num1": 4
                    }
                }
            }
        },
        "num3": "6"
    },
    {
        "hello": {
            "uno": {
                "dos": {
                    "tres": {
                        "num4": "10"
                    }
                }
            }
        },
        "bonjour": {
            "un": {
                "deux": {
                    "trois": {
                        "num2": "8",
                        "num1": 7
                    }
                }
            }
        },
        "num3": "9"
    }
];

module.exports = {
    test,
    result
}