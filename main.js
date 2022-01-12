#!/usr/bin/env node

const helpObj = require("./commmands/help")
const organizeObj = require("./commmands/organize")
const treeObj = require("./commmands/tree")

const input = process.argv.slice(2)
const cmd = input[0]

switch (cmd) {
    case "tree":
        treeObj.treeKey(input[1])
        break
    case "organize":
        organizeObj.organizeKey(input[1])
        break
    case "help":
        helpObj.helpKey()
        break
    default:
        console.log("Please input valid command")
}