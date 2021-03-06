const parseFile = require("../index");
const path = require("path");

const test = async (doLog) => {
    const linkFile = "./simple_complexe.csv";
    const link = path.join(__dirname, linkFile);
    if (doLog != false) {
        console.log(`- More complexe structure with array schema with object inside - ${path.basename(__filename)} - "${linkFile}"`);
    }
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
    return parseFile(link, schema);
};

const result = [
    [
        "4",
        "text",
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