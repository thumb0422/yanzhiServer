var fs = require("fs");
var path = require('path');

function imageEncodeBase64(imageName) {
    let rootDir = process.cwd()
    imageDir = rootDir + '/public' + imageName
    imageBuf = fs.readFileSync(imageDir)

    suffix = imageDir.split(".")[1];
    prefix = "data:image/" + suffix + ";base64,";
    base64 = new Buffer(imageBuf, 'binary').toString('base64');
    imageBase64Result = prefix + base64
    console.log(imageBase64Result)
    return imageBase64Result
}

function decodeBase64Image(data) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

module.exports = {
    imageEncodeBase64,
    decodeBase64Image,
}