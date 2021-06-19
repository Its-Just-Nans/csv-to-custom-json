const fs = require("fs");
const path = require("path");

const test = async () => {
    let doLog = true;
    let listOfFiles = fs.readdirSync(__dirname);
    listOfFiles = listOfFiles.filter((name) => name.endsWith("test.js") && name !== "test.js");


    if (typeof args !== "undefined") {
        if (args.includes("-n")) {
            args.splice(args.indexOf("-n"), 1);
            doLog = false;
        }
        if (args.length > 0) {
            console.log(args);
            listOfFiles = [];
            for (const oneArg of args) {
                if (!oneArg.startsWith("-")) {
                    listOfFiles.push(oneArg.replace("test/", ""));
                }
            }
        }
    }

    for (const oneName of listOfFiles) {
        if (fs.existsSync(oneName) || fs.existsSync(`test/${oneName}`)) {
            const testFile = require(path.join(__dirname, oneName));
            const res = await testFile.test(doLog);
            try {
                if (JSON.stringify(res) == JSON.stringify(testFile.result)) {
                    console.log("OK");
                } else {
                    console.log(JSON.stringify(res, null, 4));
                    throw "";
                }
            } catch (error) {
                console.error(error);
                throw new Error("NOT OK");
            }
        } else {
            console.error(`CANNOT ACCESS TO "${oneName}"`);
            //throw new Error(`CANNOT ACCESS TO ${oneName}`);
        }
    }
};

let [nodePath, filePath, ...args] = process.argv;
test(args);