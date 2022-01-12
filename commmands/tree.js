const fs = require("fs")
const path = require("path")
const helpObj = require("../commmands/help")

function treeFn(dirPath) {
    if (dirPath == undefined) {
        treeMaker(process.cwd(), "")
    } else {
        let doesExist = fs.existsSync(dirPath)
        if (doesExist) {
            treeMaker(dirPath, "")
        } else {
            console.log("Enter correct path")
            helpObj.helpKey()
        }
    }
}

function treeMaker(dirPath, indent) {
    let isFile = fs.lstatSync(dirPath).isFile()
    if (isFile) {
        let fileName = path.basename(dirPath)
        console.log(indent + "├──" + fileName)
    } else {
        let dirName = path.basename(dirPath)
        console.log(indent + "└──" + dirName)
        let childrens = fs.readdirSync(dirPath);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(dirPath, childrens[i]);
            treeMaker(childPath, indent + "\t");
        }
    }
}

module.exports = {
    treeKey: treeFn
}