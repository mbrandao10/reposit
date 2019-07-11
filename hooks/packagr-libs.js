var execSync = require('child_process').execSync;
var fs = require('fs');
var fsextra = require('fs-extra');
var pjson = require('../package.json');
var rimraf = require('rimraf');
var path = require('path');

var distribute = function() {
    cleanLibs();
    updateVersion();
    compileAppModules();
    moveLibs();
    copyHtml();
}

String.prototype.replaceAll = function(target, replacement) {
    return this.split(target).join(replacement);
};

let modules = [
    { origin: "onesait/onesait-api",  name: "onesait-api"  },
    { origin: "onesait/onesait-core", name: "onesait-core" },
    { origin: "onesait/onesait-sepa", name: "onesait-sepa" },
    { origin: "onesait/onesait-factoring", name: "onesait-factoring" },
    { origin: "onesait/onesait-accounts", name: "onesait-accounts" },
    { origin: "onesait/onesait-leasing", name: "onesait-leasing" },
    { origin: "onesait/onesait-taxes", name: "onesait-taxes" },
    { origin: "onesait/onesait-transfers", name: "onesait-transfers" },
    { origin: "onesait/onesait-profile", name: "onesait-profile"},
    { origin: "itecban/itecban-common", name: "itecban-common" },
    { origin: "onesait/onesait-confirming", name: "onesait-confirming" },
    { origin: "onesait/onesait-nbexpress", name: "onesait-nbexpress" },
    { origin: "onesait/onesait-credits", name: "onesait-credits"},
    { origin: "itecban/itecban-cards", name: "itecban-cards" },
    { origin: "itecban/itecban-alerts", name: "itecban-alerts" },
    { origin: "itecban/itecban-mailbox", name: "itecban-mailbox" },
    { origin: "itecban/itecban-signatures", name: "itecban-signatures" },
    { origin: "itecban/itecban-persons", name: "itecban-persons" },
    { origin: "itecban/itecban-directdebits", name: "itecban-directdebits" },
    { origin: "itecban/itecban-cashpooling", name: "itecban-cashpooling" },
    { origin: "itecban/itecban-accounts", name: "itecban-accounts" },
    { origin: "itecban/itecban-deposits", name: "itecban-deposits" },
    { origin: "itecban/itecban-foreignoperations", name: "itecban-foreignoperations" },
    { origin: "itecban/itecban-loans", name: "itecban-loans" },
    { origin: "itecban/itecban-funds", name: "itecban-funds" },
    { origin: "itecban/itecban-equities", name: "itecban-equities" },
    { origin: "itecban/itecban-credits", name: "itecban-credits" },
    { origin: "itecban/itecban-settings", name: "itecban-settings" }
];

var compileAppModules = function() {
    console.log("\x1b[36m%s\x1b[0m", "***** compile app-modules start *****");
    modules.forEach(myModule => {
        execSync('ng build ' + myModule.name, { stdio: 'inherit' });
    })
    console.log("\x1b[36m%s\x1b[0m", "***** app-modules finished *****");
}


cleanLibs = function() {
    console.log("\x1b[36m%s\x1b[0m", "***** cleaning libs folder *****");
    let folder = './libs';
    folder = folder.replaceAll('/', path.sep);
    fsextra.removeSync(folder);
    //rimraf('.\\node_modules\\onesait*', function () { console.log('onesait-libs removed'); });
    console.log("\x1b[36m%s\x1b[0m", "***** cleaning libs folder finished *****");

}

var moveLibs = function() {
    console.log("\x1b[36m%s\x1b[0m", "***** moving libs *****");
    fs.mkdirSync("./libs");
    modules.forEach(myModule => {
            let origin = './node_modules/' + myModule.name + '/';
            origin = origin.replaceAll('/', path.sep);
            let destiny = './libs/' + myModule.name;
            destiny = destiny.replaceAll('/', path.sep);
            fs.renameSync(origin, destiny);
        })
        //fsextra.removeSync('.\\libs\\_temp');
    console.log("\x1b[36m%s\x1b[0m", "***** moving libs finished *****");
}

var updateVersion = function() {
    console.log("\x1b[36m%s\x1b[0m", "***** updating version *****");
    modules.forEach(myModule => {
        let origin = "./src/app/" + myModule.origin + "/package.json";
        origin = origin.replaceAll('/', path.sep);
        var myPackage = fs.readFileSync(origin, 'utf8')
        if (myPackage) {
            myPackage = JSON.parse(myPackage);
            myPackage.version = pjson.version;
           // if(!myPackage.name.startsWith('@onesaitbanking'))
           //     myPackage.name = '@onesaitbanking/' + myPackage.name
        }
        fs.writeFileSync(origin, JSON.stringify(myPackage, null, 4));
    });
    console.log("\x1b[36m%s\x1b[0m", "***** updating version finished *****");

}

var copyHtml = function() {
    console.log("\x1b[36m%s\x1b[0m", "***** copying html to libs *****");
    modules.forEach(myModule => {
        try {
            let origin = "./src/app/" + myModule.origin + "/**/*.html";
            origin = origin.replaceAll('/', path.sep);
            let destiny = './views/' + myModule.name + '';
            destiny = destiny.replaceAll('/', path.sep);
            execSync(
                'copyfiles -u 4 ' + origin + ' ' + destiny
            )
            let viewsOrigin = "./views/" + myModule.name;
            viewsOrigin = viewsOrigin.replaceAll('/', path.sep);
            let viewsDestiny = './libs/' + myModule.name + '/views';
            viewsDestiny = viewsDestiny.replaceAll('/', path.sep);
            fs.renameSync(viewsOrigin, viewsDestiny);
        } catch (e) {

        }

    })
    let folder = './views';
    folder = folder.replaceAll('/', path.sep);
    fsextra.removeSync(folder);
    //fsextra.removeSync('.\\libs\\_temp');
    console.log("\x1b[36m%s\x1b[0m", "***** copying html to libs finished *****");
}


distribute();
