var svnUltimate = require('node-svn-ultimate');
var readline = require('readline');
let svnRoute = 'https://slsvn.indra.es/TDISI/ITECBAN/PRODUCTO/bankingAPI/';

let apiArray = [
    { origin: 'api-accounts/trunk/definition/raml/examples', destiny: './raml/accounts' },
    { origin: 'api-common/trunk/definition/raml/examples', destiny: './raml/common' },
    { origin: 'api-cards/trunk/definition/raml/examples', destiny: './raml/cards' },
    { origin: 'api-credits/trunk/definition/raml/examples', destiny: './raml/credits' },
    { origin: 'api-customers/trunk/definition/raml/examples', destiny: './raml/customers' },
    { origin: 'api-users/trunk/definition/raml/examples', destiny: './raml/users' },
    { origin: 'api-confirming/trunk/definition/raml/examples', destiny: './raml/confirming' },
    { origin: 'api-sepa-files/trunk/definition/raml/examples', destiny: './raml/sepa-files' },
    { origin: 'api-factoring/trunk/definition/raml/examples', destiny: './raml/factoring' },
    { origin: 'api-leasing/trunk/definition/raml/examples', destiny: './raml/leasing' },
    { origin: 'api-taxes/trunk/definition/raml/examples', destiny: './raml/taxes' },
    { origin: 'api-cheques/trunk/definition/raml/examples', destiny: './raml/checks' },
    { origin: 'api-funds/trunk/definition/raml/examples/', destiny: './raml/funds' },
    { origin: 'api-equities/trunk/definition/raml/examples/', destiny: './raml/equities' },
    { origin: 'api-transfers/trunk/definition/raml/examples/', destiny: './raml/transfers' },
    { origin: 'api-cash-pooling/trunk/definition/raml/examples', destiny: './raml/cash-pooling' },
    { origin: 'api-loans/trunk/definition/raml/examples', destiny: './raml/loans' },
    { origin: 'api-term-deposits/trunk/definition/raml/examples', destiny: './raml/term-deposits' },
    { originAbsolute: 'https://slsvn.indra.es/TDISI/ITECBAN/NOVOBANCO/bankingAPI/api-express-bill/trunk/definition/raml/examples', destiny: './raml/express-bill'}
]

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var downloadFromSVN = function(user, pass, index) {
    if (apiArray[index]) {
        var apiElement = apiArray[index];
        var origin = apiElement.originAbsolute ? apiElement.originAbsolute : svnRoute + apiElement.origin;

        console.log("Downloading: " + origin)
        svnUltimate.commands.checkout(
            origin,
            apiElement.destiny, {
                username: user,
                password: pass
            },
            function(err) {
                console.log("Downloaded: " + origin);
                downloadFromSVN(user, pass, index + 1);
            }
        );
    }
}

var update = function(user, pass) {
    updateFromSVN(user, pass, 0);
};

var updateFromSVN = function(user, pass, index) {
    if (apiArray[index]) {
        var apiElement = apiArray[index];
        console.log("Updating: " + apiElement.destiny)
        svnUltimate.commands.update(
            apiElement.destiny, {
                username: user,
                password: pass
            },
            function(err) {
                console.log("update: " + svnRoute + apiElement.origin);
                updateFromSVN(user, pass, index + 1);
            }
        );
    }
}

var checkout = function(user, pass) {
    downloadFromSVN(user, pass, 0);
};


module.exports.checkout = function() {
    rl.question('Usuario SVN:', (user) => {
        rl.question('Password SVN:', (pass) => {
            rl.close();
            checkout(user, pass);
        });
    });
};

module.exports.update = function() {
    rl.question('Usuario SVN:', (user) => {
        rl.question('Password SVN:', (pass) => {
            rl.close();
            update(user, pass);
        });
    });
};