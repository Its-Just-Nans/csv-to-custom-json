const parseFile = require("../index");
const path = require("path");

const test = async () => {
    const linkFile = "./simple.csv";
    const link = path.join(__dirname, linkFile);
    console.log(`- No schema but options - "${linkFile}"`);
    return parseFile(link, null, { error: "no" });
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