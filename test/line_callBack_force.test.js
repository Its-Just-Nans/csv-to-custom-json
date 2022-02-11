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
            return null; // return null but force
        },
        callBackForce: true
    });
};

const result = [
    null,
    null,
    null
];

module.exports = {
    test,
    result
}