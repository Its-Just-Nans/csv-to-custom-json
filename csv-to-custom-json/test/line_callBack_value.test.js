const parseFile = require("../index");
const path = require("path");

const test = async (doLog) => {
    const linkFile = "./simple.csv";
    const link = path.join(__dirname, linkFile);
    if (doLog != false) {
        console.log(`- CallBack after line - ${path.basename(__filename)} - "${linkFile}"`);
    }
    const schema = {
        num1: "",
        num2: "",
        num3: ""
    };
    return parseFile(link, schema, {
        lineCallBack: async (parsedLine, sourceLine) => {
            console.log(JSON.stringify(parsedLine), sourceLine, "lineCallBack");
            return {
                [Object.keys(parsedLine)[0]]: parsedLine[Object.keys(parsedLine)[0]] + 1,
                [Object.keys(parsedLine)[1]]: parsedLine[Object.keys(parsedLine)[1]] + 1,
                [Object.keys(parsedLine)[2]]: parsedLine[Object.keys(parsedLine)[2]] + 1
            };
        }
    });
};

const result = [
    {
        "num1": "11",
        "num2": "21",
        "num3": "31"
    },
    {
        "num1": "41",
        "num2": "51",
        "num3": "61"
    },
    {
        "num1": "71",
        "num2": "81",
        "num3": "91"
    }
];

module.exports = {
    test,
    result
}