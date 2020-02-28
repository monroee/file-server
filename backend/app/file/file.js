const fs = require('fs');
const util = require('util');
const path = require('path');
const dotenv = require('dotenv');
const mime = require('mime');
const File = require('./file.model');
dotenv.config();

async function GetFiles() {
    try {

        let files = fs.readdirSync(process.env.FILE_DIR);
        let result = GetDetails(files);
        return result;

    } catch (error) {
        console.log(error);
    }
}

function GetDetails(files) {
    let result = [];
    files.forEach(file => {
        let current_file = path.join(process.env.FILE_DIR, file);
        let current_file_type = mime.getType(current_file);
        let stat = fs.statSync(current_file);
        let obj = new File(
            name = file,
            type = current_file_type == null ? 'folder' : current_file_type,
            size = formatBytes(stat.size),
            modified_date = stat.mtime.toLocaleString(),
            url = process.env.FILE_DIR,
            full_path = current_file
        );
        result.push(obj);
    });
    return result;
}

function formatBytes(a, b) {
    if (0 == a) return "0 Bytes";
    var c = 1024,
        d = b || 2,
        e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}

module.exports = {
    GetFiles
};