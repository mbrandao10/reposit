const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");

var data = {

    fund_new_response: JSON.parse(fs.readFileSync(RAML_folder + '/common/success/201.json', 'utf8')),
    funds: JSON.parse(fs.readFileSync(RAML_folder + '/funds/funds/funds-collection-example.json', 'utf8')),
    fundLinkable: JSON.parse(fs.readFileSync(RAML_folder + '/funds/funds/funds-linkable-accounts.json', 'utf8')),


}

module.exports = function(app, common) {

    app.post('/api-funds/funds', function(req, res) {
        setTimeout(function() {
            console.log('post new fund');
            if (!req.headers['x-signature-transaction'])
                res.status(400).send(common.error400Signature);
            else {
                res.send(data.fund_new_response);
            }
        }, 500);
    });

    app.get('/api-funds/funds', function(req, res) {
        setTimeout(function() {
            console.log('Fondos');
            res.send(data.funds);
        }, 500);
    });


    app.get('/api-funds/funds/accounts/linkable', function(req, res) {
        setTimeout(function() {
            console.log('cuentas asociables a fondos');
            res.send(data.fundLinkable);
        }, 500);
    });

    app.get('/api-products/products/funds', function(req, res) {
        setTimeout(function() {
            console.log('productos asociables a fondos');
            res.send(data.fundProducts);
        }, 500);
    });

}