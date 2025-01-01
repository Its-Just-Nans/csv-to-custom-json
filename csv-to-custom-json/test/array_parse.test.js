const parseFile = require("../index");
const path = require("path");

const test = async (doLog) => {
    const linkFile = "./simple_complexe.csv";
    const link = path.join(__dirname, linkFile);
    if (doLog != false) {
        console.log(`- More complexe structure with array schema - ${path.basename(__filename)} - "${linkFile}"`);
    }
    const schema = [
        "num4",
        "text",
        function (allValues) {
            return `toto${allValues.toString()}`;
        },
        () => "arrow"
    ];
    return parseFile(link, schema, {
        arrayParse: false
    });
};

const result = [
    [
        "num4",
        "text",
        "toto1,2,3,4",
        "arrow"
    ],
    [
        "num4",
        "text",
        "toto4,5,6,7",
        "arrow"
    ],
    [
        "num4",
        "text",
        "toto7,8,9,10",
        "arrow"
    ]
];

module.exports = {
    test,
    result
}