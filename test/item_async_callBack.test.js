const parseFile = require("../index");
const path = require("path");

const test = async (doLog) => {
    const linkFile = "./simple.csv";
    const link = path.join(__dirname, linkFile);
    if (doLog != false) {
        console.log(`- CallBack on item with async callBack - ${path.basename(__filename)} - "${linkFile}"`);
    }
    const schema = {
        num1: "",
        async num2(item) {
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(`callBack${item}`);
                }, 500);
                // Only 500 ms because the test will be too long :/
            });
        },
        num3: ""
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