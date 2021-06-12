const parseFile = require("../index");
const path = require("path");

const test = async () => {
    const linkFile = "./simple.csv";
    const link = path.join(__dirname, linkFile);
    console.log(`- Don't parse Value (force) - "${linkFile}"`);
    const schema = {
        num1: "int",
        num2: "float",
        num3: "string"
    };
    return parseFile(link, schema, {
        parse: false
    });
};

const result = [
    {
        "num1": "1",
        "num2": "2",
        "num3": "3"
    },
    {
        "num1": "4",
        "num2": "5",
        "num3": "6"
    },
    {
        "num1": "7",
        "num2": "8",
        "num3": "9"
    }
];

module.exports = {
    test,
    result
}