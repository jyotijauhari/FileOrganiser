//for help command

function help(){
    console.log(
        `
        These different commands supported by this "file organiser" project are:

        1. node main.js tree <path>
        2. node main.js organize <path>
        3. node main.js help
        `
    );
}

module.exports = {
    help:help
}