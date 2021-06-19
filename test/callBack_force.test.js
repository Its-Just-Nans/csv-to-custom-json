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
        lineCallBack: function () {
            return null
        },
        debug: true
    });
};

const result = [
    {
        "num1": "1",
        "num2": null,
        "num3": "3"
    },
    {
        "num1": "4",
        "num2": null,
        "num3": "6"
    },
    {
        "num1": "7",
        "num2": null,
        "num3": "9"
    }
];

module.exports = {
    test,
    result
}