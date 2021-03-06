const parseFile = require("../index");
const path = require("path");

const test = async (doLog) => {
    const linkFile = "./simple_complexe.csv";
    const link = path.join(__dirname, linkFile);
    if (doLog != false) {
        console.log(`- Private Separator - ${path.basename(__filename)} - "${linkFile}"`);
    }
    const schema = {
        num4: {
            num1: "string",
            "num1...": "string",
            num2: "string",
            num3: "int",
            hello4: (value) => {
                return `The number 4 is ${value}`;
            }
        }
    };
    // with normal separator, "num1..." will be not displayed
    return parseFile(link, schema, {
        debug: true,
    });
};

const result = [
    {
        "num4": {
            "num1": "1",
            "num2": "2",
            "num3": 3,
            "hello4": "The number 4 is 1,2,3,4"
        }
    },
    {
        "num4": {
            "num1": "4",
            "num2": "5",
            "num3": 6,
            "hello4": "The number 4 is 4,5,6,7"
        }
    },
    {
        "num4": {
            "num1": "7",
            "num2": "8",
            "num3": 9,
            "hello4": "The number 4 is 7,8,9,10"
        }
    }
];

module.exports = {
    test,
    result
}