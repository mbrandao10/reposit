var execSync = require('child_process').execSync;
var fs = require('fs');
var fsextra = require('fs-extra');
var pjson = require('../package.json');
var rimraf = require('rimraf');

var distribute = function() {
    cleanLibs();
    compileAppModules();
    moveLibs();
}

let modules = [
    { origin: "onesait\\onesait-api", destiny: "onesait-api" },
    { origin: "onesait\\onesait-core", destiny: "onesait-core" },
    { origin: "itecban\\itecban-accounts", destiny: "itecban-accounts" },
    { origin: "itecban\\itecban-signatures", destiny: "itecban-signatures" },
    { origin: "itecban\\itecban-alerts", destiny: "itecban-alerts" },
    { origin: "itecban\\itecban-common", destiny: "itecban-common" },
    { origin: "itecban\\itecban-credits", destiny: "itecban-credits" },
    { origin: "itecban\\itecban-deposits", destiny: "itecban-deposits" },
    { origin: "itecban\\itecban-directdebits", destiny: "itecban-directdebits" },
    { origin: "itecban\\itecban-environment", destiny: "itecban-environment" },
    { origin: "itecban\\itecban-loans", destiny: "itecban-loans" },
    { origin: "itecban\\itecban-funds", destiny: "itecban-funds" },
    { origin: "itecban\\itecban-equities", destiny: "itecban-equities" },
    { origin: "itecban\\itecban-foreignoperations", destiny: "itecban-foreignoperations" },
    { origin: "itecban\\itecban-cashpooling", destiny: "itecban-cashpooling" },
    { origin: "itecban\\itecban-mailbox", destiny: "itecban-mailbox" },
    { origin: "itecban\\itecban-persons", destiny: "itecban-persons" },
    { origin: "itecban\\itecban-transfer", destiny: "itecban-transfer" },
    { origin: "itecban\\itecban-cards", destiny: "itecban-cards" },
    { origin: "onesait\\onesait-confirming", destiny: "onesait-confirming" }
];

var compileAppModules = function() {
    console.log("\x1b[36m%s\x1b[0m", "***** compile app-modules start *****");
    execSync('.\\node_modules\\.bin\\ngc.cmd -p .\\src\\app\\tsconfig.libs.json', function(err, stdout, stderr) {})
    modules.forEach(myModule => {
        copyPackageAndUpdateVersion('.\\src\\app\\' + myModule.origin + '\\package.json', '.\\libs\\_temp\\' + myModule.origin + '\\package.json');
    })
    console.log("\x1b[36m%s\x1b[0m", "***** app-modules finished *****");
}


cleanLibs = function() {
    console.log("\x1b[36m%s\x1b[0m", "***** cleaning libs folder *****");
    fsextra.removeSync('.\\libs');
    //rimraf('.\\node_modules\\onesait*', function () { console.log('onesait-libs removed'); }); 
    console.log("\x1b[36m%s\x1b[0m", "***** cleaning libs folder finished *****");

}

var moveLibs = function() {
    console.log("\x1b[36m%s\x1b[0m", "***** moving libs *****");
    modules.forEach(myModule => {
        fs.renameSync('.\\libs\\_temp\\' + myModule.origin + '\\', '.\\libs\\' + myModule.destiny + '\\');
    })
    fsextra.removeSync('.\\libs\\_temp');
    console.log("\x1b[36m%s\x1b[0m", "***** moving libs finished *****");
}

var copyPackageAndUpdateVersion = function(origin, destiny) {
    var myPackage = fs.readFileSync(origin, 'utf8')
    if (myPackage) {
        myPackage = JSON.parse(myPackage);
        myPackage.version = pjson.version;
    }
    fs.writeFileSync(destiny, JSON.stringify(myPackage, null, 4));
}


distribute();