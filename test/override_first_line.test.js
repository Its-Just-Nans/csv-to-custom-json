const parseFile = require("../index");
const path = require("path");

const test = async () => {
    const linkFile = "./simple_complexe.csv";
    const link = path.join(__dirname, linkFile);
    console.log(`- Override the first line - "${linkFile}"`);
    const newFirstLine = ["hello1", "hello2", "hello3", "hello4"];
    const schema = {
        num4: {
            num4: "string",
            hello1: "string",
            hello2: "int",
            hello3: "float",
            hello4: (value) => {
                return `The number 4 is ${value}`;
            }
        }
    };
    return parseFile(link, schema, {
        overrideFirstLine: newFirstLine
    });
};

const result = [
    {
        "num4": {
            "num4": "string",
            "hello1": "1",
            "hello2": 2,
            "hello3": 3,
            "hello4": "The number 4 is 4"
        }
    },
    {
        "num4": {
            "num4": "string",
            "hello1": "4",
            "hello2": 5,
            "hello3": 6,
            "hello4": "The number 4 is 7"
        }
    },
    {
        "num4": {
            "num4": "string",
            "hello1": "7",
            "hello2": 8,
            "hello3": 9,
            "hello4": "The number 4 is 10"
        }
    }
];

module.exports = {
    test,
    result
}