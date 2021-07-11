const parseFile = require("../index");
const path = require("path");

const test = async (doLog) => {
    const linkFile = "./simple_complexe.csv";
    const link = path.join(__dirname, linkFile);
    if (doLog != false) {
        console.log(`- More complexe structure for array lover - ${path.basename(__filename)} - "${linkFile}"`);
    }
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
    return parseFile([
        "num1,num2,num3,num4",
        "1,2,3,4",
        "4,5,6,7",
        "7,8,9,10"
    ], schema);
};

const result = [
    [
        "4",
        "text",
        [
            "arrayHereLol",
            [
                "andHereLol",
                {
                    "obj": "lol",
                    "num4": 4
                }
            ]
        ],
        "toto1,2,3,4",
        "arrow",
        {
            "staticValue": "value",
            "num1": 1
        }
    ],
    [
        "7",
        "text",
        [
            "arrayHereLol",
            [
                "andHereLol",
                {
                    "obj": "lol",
                    "num4": 7
                }
            ]
        ],
        "toto4,5,6,7",
        "arrow",
        {
            "staticValue": "value",
            "num1": 4
        }
    ],
    [
        "10",
        "text",
        [
            "arrayHereLol",
            [
                "andHereLol",
                {
                    "obj": "lol",
                    "num4": 10
                }
            ]
        ],
        "toto7,8,9,10",
        "arrow",
        {
            "staticValue": "value",
            "num1": 7
        }
    ]
];

module.exports = {
    test,
    result
}