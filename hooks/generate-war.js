var execSync = require('child_process').execSync;
var svnUltimate = require('node-svn-ultimate');
var readline = require('readline');
let svnRoute = 'https://slsvn.indra.es/TDISI/ITECBAN/PRODUCTO';
var path = require('path');
var fs = require('fs');
var fsextra = require('fs-extra');

let downloadFiles = [
    { origin: '/OnesaitBanking/OnesaitBusiness/tags/onesaitbusiness', destiny: './dist/onesaitbusiness.war' }
]


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var downloadFromSVN = function(user, pass, index) {
    if (downloadFiles[index]) {
        var apiElement = downloadFiles[index];
        console.log("Downloading: " + svnRoute + apiElement.origin)
        svnUltimate.commands.checkout(
            svnRoute + apiElement.origin,
            apiElement.destiny, {
                username: user,
                password: pass
            },
            function(err) {
                console.log("Downloaded: " + svnRoute + apiElement.origin);
                downloadFromSVN(user, pass, index + 1);
            }
        );
    } else {
        copyAngularFilesAndBuildMaven();
    }
}

var copyAngularFilesAndBuildMaven = () => {

    copyFolderRecursiveSync('.' + path.sep + 'dist' + path.sep + 'onesait-banking', '.' + path.sep + 'dist' + path.sep + 'onesaitbusiness.war' + path.sep + 'src' + path.sep + 'main' + path.sep + 'webapp');
    execSync('mvn clean package ', { cwd: '.' + path.sep + 'dist' + path.sep + 'onesaitbusiness.war', stdio: 'inherit' });
}

//COPY FOLDERS
function copyFileSync(source, target) {

    var targetFile = target;

    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
    var files = [];

    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function(file) {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                if (!fs.existsSync(target + path.sep + path.basename(curSource)))
                    fs.mkdirSync(target + path.sep + path.basename(curSource));
                copyFolderRecursiveSync(curSource, target + path.sep + path.basename(curSource));
            } else {
                copyFileSync(curSource, target);
            }
        });
    }
}
//FIN COPY FOLDERS


var checkout = function(user, pass) {
    fsextra.removeSync('.' + path.sep + 'dist' + path.sep + 'onesaitbusiness.war');
    downloadFromSVN(user, pass, 0);
};


module.exports.checkout = function() {
    rl.question('Usuario SVN:', (user) => {
        rl.question('Password SVN:', (pass) => {
            rl.close();
            checkout(user, pass);
            //copyAngularFilesAndBuildMaven();
        });
    });
};