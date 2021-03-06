const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const fileList = process.argv[2];
const dest = process.argv[3];

const filesToCopy = fs.readFileSync(fileList).toString();
// console.log(filesToCopy);

const copyArgs = filesToCopy.split("\n").filter(file => file.length).map(moduleName => {
    return "../../node_modules/@openui5/sap.ui.core/src/" + moduleName + " " + path.dirname(path.join(dest, moduleName));
});

copyArgs.forEach(args => {
    console.log(args);
    child_process.execSync(`npx copy-and-watch ${args}`)
});
