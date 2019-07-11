const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");
console.log(RAML_folder);
var data = {
    
    deposits: JSON.parse(fs.readFileSync(RAML_folder + '/term-deposits/term_deposits/deposits-collection-example.json', 'utf8')),
    deposit: JSON.parse(fs.readFileSync(RAML_folder + '/term-deposits/term_deposits/deposits-item-example.json', 'utf8')),
    deposit_renewals: JSON.parse(fs.readFileSync(RAML_folder + '/term-deposits/term_deposits/renewals-collection-example.json', 'utf8')),
    deposit_locks: JSON.parse(fs.readFileSync(RAML_folder + '/term-deposits/term_deposits/locks-collection-example.json', 'utf8')),
    deposit_retentions: JSON.parse(fs.readFileSync(RAML_folder + '/term-deposits/term_deposits/retention-collection-example.json', 'utf8')),
    deposits_products: JSON.parse(fs.readFileSync(RAML_folder + '/term-deposits/term_deposits/deposits-collection-example.json', 'utf8')),
    deposit_product: JSON.parse(fs.readFileSync(RAML_folder + '/term-deposits/term_deposits/deposits-item-example.json', 'utf8')),
    deposit_simulate: JSON.parse(fs.readFileSync(RAML_folder + '/term-deposits/term_deposits/newDeposit-simulation-response.json', 'utf8')),
    deposit_new_response: JSON.parse(fs.readFileSync(RAML_folder + '/term-deposits/term_deposits/201-newDeposit-success.json', 'utf8')),
    deposit_alias: JSON.parse(fs.readFileSync(RAML_folder + '/term-deposits/term_deposits/alias-example.json', 'utf8')),

}

module.exports = function (app, common) {
    
    app.get('/api-term-deposits/term-deposits', function (req, res) {
        setTimeout(function () {
            console.log('deposits');
            res.send(data.deposits);
        }, 500);
    });

    app.get('/api-term-deposits/term-deposits/:depositId', function (req, res) {
        setTimeout(function () {
            console.log('deposit');
            res.send(data.deposit);
        }, 500);
    });

    app.put('/api-term-deposits/term-deposits/:depositId', function (req, res) {
        setTimeout(function () {
            console.log('deposit update autorenewal');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.get('/api-term-deposits/term-deposits/:depositId/renewals', function (req, res) {
        setTimeout(function () {
            console.log('deposit renewals');
            res.send(data.deposit_renewals);
        }, 500);
    });

    app.put('/api-term-deposits/term-deposits/:depositId/alias', function (req, res) {
        setTimeout(function () {
            console.log('deposit update alias');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.get('/api-term-deposits/term-deposits/:depositId/alias', function (req, res) {
        setTimeout(function () {
            console.log('deposit getting alias');
            res.send(data.deposit_alias);
        }, 500);
    });

    app.get('/api-term-deposits/term-deposits/:depositId/locks', function (req, res) {
        setTimeout(function () {
            console.log('deposit locks');
            res.send(data.deposit_locks);
        }, 500);
    });

    app.get('/api-term-deposits/term-deposits/:depositId/retentions', function (req, res) {
        setTimeout(function () {
            console.log('deposit retentions');
            res.send(data.deposit_retentions);
        }, 500);
    });

    app.get('/api-term-deposits/products/:productCode', function (req, res) {
        setTimeout(function () {
            console.log('deposits products');
            res.send(data.deposits_products);
        }, 500);
    });

    app.get('/products/term-deposits/:productCode', function (req, res) {
        setTimeout(function () {
            console.log('deposit product');
            res.send(data.deposit_product);
        }, 500);
    });

    app.post('/api-term-deposits/term-deposits/products/:productCode/simulate', function (req, res) {
        setTimeout(function () {
            console.log('post deposit simulate');
            res.send(data.deposit_simulate);
        }, 500);
    });

    app.post('/api-term-deposits/term-deposits', function (req, res) {
        setTimeout(function () {
            console.log('post new deposit');
            if (!req.headers['x-signature-transaction'])
                res.status(400).send(common.error400Signature);
            else {
                res.send(data.deposit_new_response);
            }
        }, 500);
    });
    
}