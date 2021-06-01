const parseFile = require("./index");

// output params
const doLog = true;
const woaw = false;

let allFunc = [];

allFunc.push(async () => {
    const linkFile = "test/simple.csv";
    doLog ? console.log(`Normal "${linkFile}"`) : "";
    const schema = {
        num1: "",
        num2: "",
        num3: "",
    };
    return await parseFile(linkFile, schema);
});
allFunc.push(async () => {
    const linkFile = "test/simple.csv";
    doLog ? console.log(`No schema "${linkFile}"`) : "";
    return await parseFile(linkFile);
});
allFunc.push(async () => {
    const linkFile = "test/simple_customSeparator.csv";
    doLog ? console.log(`Custom Separator "${linkFile}"`) : "";
    const schema = {
        num1: "",
        num2: "",
        num3: "",
    };
    return await parseFile(linkFile, schema, {
        separator: ";",
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple_callBackItem.csv";
    doLog ? console.log(`CallBack on item "${linkFile}"`) : "";
    const schema = {
        num1: "",
        num2: function (item) {
            return `callBack${item}`;
        },
        num3: "",
    };
    return await parseFile(linkFile, schema);
});
allFunc.push(async () => {
    const linkFile = "test/simple_CallBackLine.csv";
    doLog ? console.log(`CallBack after line "${linkFile}"`) : "";
    const schema = {
        num1: "",
        num2: "",
        num3: "",
    };
    return await parseFile(linkFile, schema, {
        lineCallBack: async (parsedLine, sourceLine) => {
            console.log(JSON.stringify(parsedLine), "lineCallBack");
        },
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple_parseValue.csv";
    doLog ? console.log(`Parse Value (default) "${linkFile}"`) : "";
    const schema = {
        num1: "int",
        num2: "float",
        num3: "string",
    };
    return await parseFile(linkFile, schema);
});
allFunc.push(async () => {
    const linkFile = "test/simple_parseValue.csv";
    doLog ? console.log(`Don't parse Value (force) "${linkFile}"`) : "";
    const schema = {
        num1: "int",
        num2: "float",
        num3: "string",
    };
    return await parseFile(linkFile, schema, {
        parse: false,
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple_complexe.csv";
    doLog ? console.log(`More complexe structure "${linkFile}"`) : "";
    const schema = {
        num1: {
            num4: "",
        },
        num2: "",
        num3: "",
    };
    return await parseFile(linkFile, schema, {
        debug: true,
    });
});
allFunc.push(async () => {
    const linkFile = "test/simple_complexe.csv";
    doLog ? console.log(`More complexe double same name "${linkFile}"`) : "";
    const schema = {
        num1: {
            num4: {
                num4: "string",
            },
        },
        num2: "",
        num3: "",
    };
    return await parseFile(linkFile, schema, {
        debug: true,
    });
});

(async () => {
    for (const oneTestFunc of allFunc) {
        console.log("------------------");
        try {
            const res = await oneTestFunc();
            doLog ? console.log(woaw ? JSON.stringify(res, null, 4) : JSON.stringify(res)) : null;
        } catch (error) {
            throw error;
            //throw new Error(error);
        }
    }
})();
