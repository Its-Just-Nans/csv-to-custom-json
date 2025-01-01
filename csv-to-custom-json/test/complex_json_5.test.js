const parseFile = require("../index");
const path = require("path");

const test = async (doLog) => {
    const linkFile = "./simple_complexe.csv";
    const link = path.join(__dirname, linkFile);
    if (doLog != false) {
        console.log(`- More complexe structure with array in array - ${path.basename(__filename)} - "${linkFile}"`);
    }
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
    return parseFile(link, schema);
};

const result = [
    {
        "hello": [
            {
                "num4": 4,
                "num1": "1"
            }
        ],
        "hello2": [
            {
                "num4": 4,
                "num1": [
                    {
                        "num3": "3"
                    }
                ]
            }
        ]
    },
    {
        "hello": [
            {
                "num4": 7,
                "num1": "4"
            }
        ],
        "hello2": [
            {
                "num4": 7,
                "num1": [
                    {
                        "num3": "6"
                    }
                ]
            }
        ]
    },
    {
        "hello": [
            {
                "num4": 10,
                "num1": "7"
            }
        ],
        "hello2": [
            {
                "num4": 10,
                "num1": [
                    {
                        "num3": "9"
                    }
                ]
            }
        ]
    }
];

module.exports = {
    test,
    result
}