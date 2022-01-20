const parseFile = require("../index");
const path = require("path");

const test = async (doLog) => {
    const linkFile = "./simple_complexe_with_void_line.csv";
    const link = path.join(__dirname, linkFile);
    if (doLog != false) {
        console.log(`- Don't avoid void line with complexe structure - ${path.basename(__filename)} - "${linkFile}"`);
    }
    const schema = [
        "num4",
        "text",
        [
            "arrayHereLol",
            [
                "andHereLol",
                {
                    obj: "lol",
                    num4: "int"
                }
            ]
        ],
        function (allValues) {
            return `toto${allValues.toString()}`;
        },
        () => "arrow",
        {
            staticValue: "value",
            num1: "int"
        }
    ];
    return parseFile(link, schema);
};

const result = [
    [
        "4",
        "text",
        [
            "arrayHereLol",
            [
                "andHereLol",
                {
                    "obj": "lol",
                    "num4": 4
                }
            ]
        ],
        "toto1,2,3,4",
        "arrow",
        {
            "staticValue": "value",
            "num1": 1
        }
    ],
    [
        "7",
        "text",
        [
            "arrayHereLol",
            [
                "andHereLol",
                {
                    "obj": "lol",
                    "num4": 7
                }
            ]
        ],
        "toto4,5,6,7",
        "arrow",
        {
            "staticValue": "value",
            "num1": 4
        }
    ],
    [
        null,
        "text",
        [
            "arrayHereLol",
            [
                "andHereLol",
                {
                    "obj": "lol",
                    "num4": null
                }
            ]
        ],
        "toto",
        "arrow",
        {
            "staticValue": "value",
            "num1": ""
        }
    ],
    [
        "10",
        "text",
        [
            "arrayHereLol",
            [
                "andHereLol",
                {
                    "obj": "lol",
                    "num4": 10
                }
            ]
        ],
        "toto7,8,9,10",
        "arrow",
        {
            "staticValue": "value",
            "num1": 7
        }
    ]
];

module.exports = {
    test,
    result
}