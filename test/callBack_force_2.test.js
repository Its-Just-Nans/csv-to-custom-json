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
            return null;
        },
        num3: "string"
    };
    return parseFile(link, schema, {
        callBackForce: true,
        lineCallBack: function () {
            return null
        }
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