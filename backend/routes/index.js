const express = require('express');
const chance = require('chance')()

const fs = require("fs");
const path = require("path");

const router = express.Router();

let integer = 0;
let real_num = 0;
let alphabetic = 0;
let alphanumeric = 0;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("Hello there");
});

router.get('/generateFile', function (req, res) {
    integer = 0;
    real_num = 0;
    alphanumeric = 0;
    alphabetic = 0;

    let option = 0; // 0 - integer, 1 - floating, 2 - alphanumeric, 3 - alphabetic
    let fileSizeInB = 0;
    let randomObject, randomResult = [];
    // it will roughly end up as 2 MB
    const FILE_SIZE_LIMIT_B = 1900000;

    while (fileSizeInB < FILE_SIZE_LIMIT_B) {
        option = chance.integer({min: 0, max: 3});

        if (option === 0) {
            randomObject = chance.integer().toString(10);
            integer += 1;
        } else if (option === 1) {
            randomObject = chance.floating().toString(10);
            real_num += 1;
        }
        else if (option === 2) {
            randomObject = chance.string({pool: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"});
            alphanumeric += 1;
        }
        else {
            randomObject = chance.string({pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"})
            alphabetic += 1;
        }

        if (fileSizeInB < FILE_SIZE_LIMIT_B) {
            randomResult.push(randomObject);
            fileSizeInB += Buffer.from(randomObject).length
        }
    }

    fs.writeFileSync("random.txt", randomResult.join(','));
    res.send("File is generated");
})

router.get("/randomStats", (req, res) => {
    res.send({
        "alphabetic": alphabetic,
        "alphanumerics" : alphanumeric,
        "integers": integer,
        "real_num": real_num
    })
})


router.get("/downloadRandom", (req, res) => {
    let file = __dirname + '/../random.txt';

    const filename = path.basename(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', "text/plain");

    const filestream = fs.createReadStream(file);
    filestream.pipe(res);
})

module.exports = router;
