const parseFile = require("../index");
const path = require("path");

const test = async () => {
    const linkFile = "./simple_complexe.csv";
    const link = path.join(__dirname, linkFile);
    console.log(`- More complexe structure with array schema - "${linkFile}"`);
    const schema = [
        "num4",
        "text",
        function (allValues) {
            return `toto${allValues.toString()}`;
        },
        () => "arrow"
    ];
    return parseFile(link, schema);
};

const result = [
    [
        "4",
        "text",
        "toto1,2,3,4",
        "arrow"
    ],
    [
        "7",
        "text",
        "toto4,5,6,7",
        "arrow"
    ],
    [
        "10",
        "text",
        "toto7,8,9,10",
        "arrow"
    ]
];

module.exports = {
    test,
    result
}