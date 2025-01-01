const parseFile = require("../index");
const path = require("path");

const test = async (doLog) => {
    const linkFile = "./simple.csv";
    const link = path.join(__dirname, linkFile);
    if (doLog != false) {
        console.log(`- CallBack on item - ${path.basename(__filename)} - "${linkFile}"`);
    }
    const schema = {
        num1: "string",
        num2(item) {
            return `callBack${item}`;
        },
        num3: "string"
    };
    return parseFile(link, schema);
};

const result = [
    {
        "num1": "1",
        "num2": "callBack2",
        "num3": "3"
    },
    {
        "num1": "4",
        "num2": "callBack5",
        "num3": "6"
    },
    {
        "num1": "7",
        "num2": "callBack8",
        "num3": "9"
    }
];

module.exports = {
    test,
    result
}