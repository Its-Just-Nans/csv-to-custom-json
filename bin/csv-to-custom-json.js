#!/usr/bin/env node

const parse = require("../index.js");
const fs = require("fs");

let [nodePath, filePath, ...args] = process.argv;

const options = {
    silent: false,
    entry: "index.csv",
    out: null,
    schema: null
};

const parseArgs = () => {
    ["-q", "--quiet", "-s", "--silent"].forEach((word) => {
        if (options.silent !== true) {
            if (args.includes(word)) {
                options.silent = true;
                args = args.filter((item) => item !== word);
            }
        }
    });
    if (args.includes("-o") || args.includes("--out")) {
        const index = args.indexOf("-o") !== -1 ? args.indexOf("-o") : args.indexOf("--out");
        if (index > -1) {
            if (typeof args[index + 1] !== "undefined") {
                options.out = args[index + 1];
                args.splice(index + 1, 1);
                args.splice(index, 1);
            }
        }
    }
    if (args.length > 0) {
        options.entry = args[0];
    }
}

parseArgs();
if (!options.silent) {
    console.log("Options :")
    for (const oneOptions in options) {
        if (typeof oneOptions !== "object" && options[oneOptions] !== null) {
            console.log(`${oneOptions} : ${options[oneOptions]}`);
        }
    }
}
let res;
(async () => {
    if (fs.existsSync(options.entry)) {
        if (options.schema === null) {
            res = await parse(options.entry);
        } else {
            const schema = require(options.schema);
            res = await parse(options.entry, schema);
        }
    }
    if (typeof res !== "undefined") {
        if (options.out !== null) {
            try {
                fs.writeFileSync(options.out, JSON.stringify(res, null, 4));
            } catch (error) {
                throw new Error("Error during write the out file")
            }
        } else {
            if (!options.silent) {
                console.log(JSON.stringify(res, null, 4));
            }
        }
    }
})()