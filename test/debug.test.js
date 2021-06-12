const parseFile = require("../index");
const path = require("path");

const test = async () => {
    const linkFile = "./simple.csv";
    const link = path.join(__dirname, linkFile);
    console.log(`- Normal with debug output - "${linkFile}"`);
    const schema = {
        num1: "",
        num2: "",
        num3: ""
    };
    return parseFile(link, schema, {
        debug: true
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