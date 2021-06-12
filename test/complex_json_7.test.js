const parseFile = require("../index");
const path = require("path");

const test = async () => {
    const linkFile = "./simple_complexe.csv";
    const link = path.join(__dirname, linkFile);
    console.log(`- More complexe structure with array with callback - "${linkFile}"`);
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
                "num3": "hey3",
                "num1": [
                    "4",
                    "text",
                    "toto1,2,3,4",
                    "arrow"
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
                "num3": "hey6",
                "num1": [
                    "7",
                    "text",
                    "toto4,5,6,7",
                    "arrow"
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
                "num3": "hey9",
                "num1": [
                    "10",
                    "text",
                    "toto7,8,9,10",
                    "arrow"
                ]
            }
        ]
    }
];

module.exports = {
    test,
    result
}