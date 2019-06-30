const fs = require("fs");
const {execSync} = require('child_process');

const partSize = '2g'
const recoveryPercent = 5;
const password = 'irangfx.com';
const compressionMethod = 5;
const bannerPath = 'banner.txt';
const siteShorcut = 'IranGFX.com.url';

if (!fs.existsSync(bannerPath) || !fs.existsSync(siteShorcut)) return;

fs.readdir('./', function (err, files) {
    if (err) throw err;

    files.filter(function (file) {
        return fs.statSync(file).isDirectory();
    }).forEach(function (file) {
        if (fs.existsSync(`${file}.rar`)) return;

        fs.copyFileSync(`./${siteShorcut}`, `./${file}/${siteShorcut}`);
        execSync(`rar -p${password} -r a -v${partSize} -rr${recoveryPercent} -m${compressionMethod} -z${bannerPath} "${file}.rar" "${file}"`);
        console.log(`Archive File Finish => ${file}.rar`);
    });
});