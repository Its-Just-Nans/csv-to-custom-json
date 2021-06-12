#!/usr/bin/env node

const parse = require("../index.js");
const fs = require("fs");
const path = require("path");

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
    if (args.includes("-op") || args.includes("--options")) {
        const index = args.indexOf("-op") !== -1 ? args.indexOf("-op") : args.indexOf("--options");
        if (index > -1) {
            if (typeof args[index + 1] !== "undefined") {
                options.options = args[index + 1];
                args.splice(index + 1, 1);
                args.splice(index, 1);
            }
        }
    }
    if (args.includes("-sc") || args.includes("--schema")) {
        const index = args.indexOf("-sc") !== -1 ? args.indexOf("-sc") : args.indexOf("--schema");
        if (index > -1) {
            if (typeof args[index + 1] !== "undefined") {
                options.schema = args[index + 1];
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
        let schema;
        let optionsObject = {};

        if (options.options !== null) {
            if (fs.existsSync(options.options)) {
                try {
                    const goodPath = path.join(process.cwd(), options.options);
                    optionsObject = require(goodPath);
                } catch (error) {
                    throw new Error(`ERROR: Can't access to ${options.options}`);
                }
            } else {
                throw new Error(`ERROR: Can't access to ${options.options}`);
            }
        }
        if (options.schema !== null) {
            if (fs.existsSync(options.schema)) {
                try {
                    const goodPath = path.join(process.cwd(), options.schema);
                    schema = require(goodPath);
                } catch (error) {
                    throw new Error(`ERROR: Can't access to ${options.schema}`);
                }
            } else {
                throw new Error(`ERROR: Can't access to ${options.schema}`);
            }
        }
        try {
            if (options.silent) {
                optionsObject.debug = false;
            }
            res = await parse(options.entry, schema, optionsObject);
        } catch (errorParse) {
            throw new Error("ERROR: parsing error");
        }
    } else {
        throw new Error(`ERROR: Can't access to ${options.entry}`);
    }
    if (typeof res !== "undefined") {
        if (options.out !== null) {
            try {
                fs.writeFileSync(options.out, JSON.stringify(res, null, 4));
            } catch (error) {
                throw new Error("ERROR: problem when writing output")
            }
        } else {
            if (!options.silent) {
                try {
                    console.log(JSON.stringify(res, null, 4));
                } catch (error) {
                    throw new Error("ERROR: problem when writing output")
                }
            }
        }
    } else {
        throw new Error("Error during parsing or can't parse");
    }
})().catch((e) => {
    console.log(e);
})