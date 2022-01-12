const fs = require("fs")
const path = require("path")
const { types } = require("../utility")
const helpObj = require("../commmands/help")

function orgFn(dirPath) {
    let destPath
    if (dirPath == undefined) {
        dirPath = process.cwd()
        destPath = path.join(dirPath, "organized_files")
        if (fs.existsSync(destPath) == false) {
            fs.mkdirSync(destPath)
        }
        organize(dirPath, destPath);
        return
    } else {
        let doesExist = fs.existsSync(dirPath)
        if (doesExist) {
            destPath = path.join(dirPath, "organized_files")
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath)
            }
        } else {
            console.log("Enter correct path")
            helpObj.helpKey()
            return
        }
    }
    organize(dirPath, destPath);
}

function organize(src, dest) {
    let content = fs.readdirSync(src)
    for (let i = 0; i < content.length; i++) {
        let address = path.join(src, content[i])
        let isFile = fs.lstatSync(address).isFile()
        if (isFile) {
            let categorie = getCategorie(content[i])
            if (categorie != undefined) {
                sendFile(address, dest, categorie)
            }
        }
    }
}

function getCategorie(name) {
    let ext = path.extname(name)
    ext = ext.slice(1)
    if (ext === "ini") {
        return
    }
    for (let type in types) {
        let currType = types[type]
        for (let i = 0; i < currType.length; i++) {
            if (ext == currType[i]) {
                return type
            }
        }
    }
    return "others"
}

function sendFile(src, dest, cat) {
    let catPath = path.join(dest, cat)
    if (fs.existsSync(catPath) == false) {
        fs.mkdirSync(catPath)
    }
    let fileName = path.basename(src)
    let destFilePath = path.join(catPath, fileName)
    fs.copyFileSync(src, destFilePath)
}

module.exports = {
    organizeKey: orgFn
}