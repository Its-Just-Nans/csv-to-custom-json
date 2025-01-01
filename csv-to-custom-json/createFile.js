const fs = require("fs");


let [nodePath, filePath, ...args] = process.argv;

const createFile = () => {
    const file = fs.readFileSync("./index.js");
    let goodFile = file.toString();
    goodFile = goodFile.replace(/^.*\/\/ front-not-used [^\/]*\/\/ front-not-used end-block$/gm, "");
    goodFile = goodFile.replace("module.exports = parseFile;", "export default parseFile;");
    fs.writeFileSync("./front.js", goodFile);
    console.log("done");
}

if (typeof args !== "undefined" &&
    typeof args.length !== "undefined"
    && args.length > 0) {
    setInterval(() => {
        createFile();
    }, 2000)
} else {
    createFile();
}