const parseFile = require("../index");
const path = require("path");

const test = async () => {
    const linkFile = "./simple_complexe.csv";
    const link = path.join(__dirname, linkFile);
    console.log(`- More complexe structure with same name - "${linkFile}"`);
    const schema = {
        num1: {
            num4: {
                num4: "string"
            }
        },
        num2: "",
        num3: ""
    };
    return parseFile(link, schema);
};

const result = [
    {
        "num1": {
            "num4": {
                "num4": "4"
            }
        },
        "num2": "2",
        "num3": "3"
    },
    {
        "num1": {
            "num4": {
                "num4": "7"
            }
        },
        "num2": "5",
        "num3": "6"
    },
    {
        "num1": {
            "num4": {
                "num4": "10"
            }
        },
        "num2": "8",
        "num3": "9"
    }
];

module.exports = {
    test,
    result
}