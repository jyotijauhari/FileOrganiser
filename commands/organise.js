//for organise.js

const fs = require("fs"); //fs module
const path = require("path"); //path module
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images: ['png','jpg','jpeg']
}

function organise(srcPath){
    //step 1: check if path is entered by user or not
    if(srcPath == undefined){
        //if path is not entered then by default it will organise file of current directory
        srcPath = process.cwd();
    }

    //step 2: created organised_file folder
    let organisedFiles = path.join(srcPath,"organised_files");

    let exist = fs.existsSync(organisedFiles);
    // console.log(organisedFiles);

    if(!exist){
        fs.mkdirSync(organisedFiles);
    }
    else{
        //pass
    }

    //step 3: getting name of all files of srcPath folder
    let allFilesArr = fs.readdirSync(srcPath);
    console.log(allFilesArr);
    
    
    //step 4: getting type of file 
    for(let i = 0; i<allFilesArr.length; i++){

        //fullpath of file is required to know if its file or not
        let fullPathOfFile = path.join(srcPath,allFilesArr[i]);
        let isFile = fs.lstatSync(fullPathOfFile).isFile();
        if(isFile){
            // console.log(allFilesArr[i] + " is file");

            //getting extension name of file
            let ext = allFilesArr[i].split(".")[1];
            // console.log("extension of " + allFilesArr[i] + " = " + ext);

            //step 5: getting folder name for that file 
            let folderName = getFolderName(ext);
            console.log(allFilesArr[i] + " will be added in :" + folderName );

            //step 6: copying file to destination type folder in organised_Files folder
            let fileName = allFilesArr[i];
            copyFileToDestinationFolder(srcPath, fileName, folderName);
        }
        
    }
    

}

function getFolderName(ext){
    for(key in types){
        for(let i=0; i<types[key].length; i++){
            // console.log("---" + types[key][i])
            if(types[key][i] == ext){
                return key;
            }
        }
    }
    //if file doesn't belong to any of specified types then it will be added to miscellaneous folder
    return "miscellaneous";
}

function copyFileToDestinationFolder(srcPath, fileName, folderName){
    //goal : fs.copyfilesync(src,dest);

    //check if folder exist or not where we want to copy file
    let destFolder = path.join(srcPath, "organised_files", folderName);
    let folderexist = fs.existsSync(destFolder);

    if(!folderexist){
        fs.mkdirSync(destFolder);
    }

    let src = path.join(srcPath, fileName);

    //  --- srcpath/organised_files/foldername/filename
    let dest = path.join(destFolder, fileName);

    fs.copyFileSync(src, dest);

}

module.exports = {
    organise:organise
}

