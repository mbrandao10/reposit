const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");

var data = {

    equities_new_response: JSON.parse(fs.readFileSync(RAML_folder + '/common/success/201.json', 'utf8')),
    equities: JSON.parse(fs.readFileSync(RAML_folder + '/equities/equities/equities-collection-example.json', 'utf8')),
    equityLinkable: JSON.parse(fs.readFileSync(RAML_folder + '/equities/equities/equities-linkable-accounts.json', 'utf8')),


}

module.exports = function(app, common) {

    app.post('/api-equities/equities', function(req, res) {
        setTimeout(function() {
            console.log('post new equity');
            if (!req.headers['x-signature-transaction'])
                res.status(400).send(common.error400Signature);
            else {
                res.send(data.equities_new_response);
            }
        }, 500);
    });

    app.get('/api-equities/equities', function(req, res) {
        setTimeout(function() {
            console.log('Valores');
            res.send(data.equities);
        }, 500);
    });

    app.get('/api-equities/equities/accounts/linkable', function(req, res) {
        setTimeout(function() {
            console.log('cuentas asociables a valores');
            res.send(data.equityLinkable);
        }, 500);
    });

}