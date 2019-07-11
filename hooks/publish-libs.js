var execSync = require('child_process').execSync;

var publish = function() {
    publishAll();
}


var publishAll = function() {
    console.log("\x1b[36m%s\x1b[0m", "***** publishing libraries start *****");
    execSync('npm publish .\\libs\\basic', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\corebank', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\client', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\accounts', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\alerts', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\common', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\credits', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\deposits', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\funds', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\equities', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\directdebits', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\environment', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\foreignoperations', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\cashpooling', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\loans', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\mailbox', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\persons', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\transfer', function(err, stdout, stderr) {});
    execSync('npm publish .\\libs\\confirming', function(err, stdout, stderr) {});
    console.log("\x1b[36m%s\x1b[0m", "***** publishing libraries finish *****");
}

publish();