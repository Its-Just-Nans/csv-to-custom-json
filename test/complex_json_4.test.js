const parseFile = require("../index");
const path = require("path");

const test = async () => {
    const linkFile = "./simple_complexe.csv";
    const link = path.join(__dirname, linkFile);
    console.log(`- More complexe structure with array - "${linkFile}"`);
    const schema = {
        hello: [
            {
                num4: "int",
                num1: "string"
            }
        ],
        num3: ""
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
        "num3": "3"
    },
    {
        "hello": [
            {
                "num4": 7,
                "num1": "4"
            }
        ],
        "num3": "6"
    },
    {
        "hello": [
            {
                "num4": 10,
                "num1": "7"
            }
        ],
        "num3": "9"
    }
];

module.exports = {
    test,
    result
}