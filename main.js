//starting point of project

const helpFun = require("./commands/help");
const organiseFun = require("./commands/organise");
const treeFun = require("./commands/tree");

//taking input from console
let inputArr = process.argv.slice(2);

//inputArr = ['organise','path']

let command = inputArr[0];
let path = inputArr[1];

switch(command){
    case "help":
        //for debugging
        console.log("help command entered");
        helpFun.help();
        break;

    case "organise":
        console.log("organise command entered");
        organiseFun.organise(path);
        break;

    case "tree":
        console.log("tree command entered");
        treeFun.tree(path);
        break;

    default:
        console.log("command not found");
        break;
}