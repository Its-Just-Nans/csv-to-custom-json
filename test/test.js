const fs = require("fs");
const path = require("path");

(async () => {
    let listOfFiles = fs.readdirSync(__dirname);

    listOfFiles = listOfFiles.filter((name) => name.endsWith("test.js") && name !== "test.js");

    for (const oneName of listOfFiles) {
        const testFile = require(path.join(__dirname, oneName));
        const res = await testFile.test();
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
    }
})();
