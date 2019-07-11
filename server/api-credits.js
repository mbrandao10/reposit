const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");

var data = {
    credits: JSON.parse(fs.readFileSync(RAML_folder + '/credits/credits/credits-collection-example.json', 'utf8')),
    credits_new_credit: JSON.parse(fs.readFileSync(RAML_folder + '/credits/credits/newCredit-input.json', 'utf8')),
    credits_products: JSON.parse(fs.readFileSync(RAML_folder +  '/credits/credits/credits-products-detail.json', 'utf8')),
    credits_credit: JSON.parse(fs.readFileSync(RAML_folder + '/credits/credits/credit-detail-example.json', 'utf8')),
    credits_interveners: JSON.parse(fs.readFileSync(RAML_folder + '/credits/credits/interveners-collection-example.json', 'utf8')),
    credits_movements: JSON.parse(fs.readFileSync(RAML_folder + '/credits/credits/movements-collection-example.json', 'utf8')),
    credits_retentions: JSON.parse(fs.readFileSync(RAML_folder + '/credits/credits/retentions-collection-example.json', 'utf8')),
    credits_locks: JSON.parse(fs.readFileSync(RAML_folder + '/credits/credits/locks-collection-example.json', 'utf8')),
}

module.exports = function (app, common) {

    app.get('/api-credits/credits', function (req, res) {
        setTimeout(function () {
            console.log('get credits');
            res.send(data.credits);
        }, 500);
    });

    app.post('/api-credits/credits', function (req, res) {
        setTimeout(function () {
            console.log('post credits new credit');
            if (!req.headers['x-signature-transaction']) {
                res.status(400).send(common.error400Signature);
            }else{
                res.send(data.credits_new_credit);
            }
        }, 500);
    });

    app.get('/api-credits/credits/products/:productCode', function (req, res) {
        setTimeout(function () {
            console.log('get credits products');
            res.send(data.credits_products);
        }, 500);
    });

    app.get('/api-credits/credits/:creditId', function (req, res) {
        setTimeout(function () {
            console.log('get credit');
            res.send(data.credits_credit);
        }, 500);
    });

    app.get('/api-credits/credits/:creditId/interveners', function (req, res) {
        setTimeout(function () {
            console.log('get credits interveners');
            res.send(data.credits_interveners);
        }, 500);
    });

    app.get('/api-credits/credits/:creditId/movements', function (req, res) {
        setTimeout(function () {
            console.log('get credits movements');
            res.send(data.credits_movements);
        }, 500);
    });

    app.get('/api-credits/credits/:creditId/retentions', function (req, res) {
        setTimeout(function () {
            console.log('get credits retentions');
            res.send(data.credits_retentions);
        }, 500);
    });

    app.get('/api-credits/credits/:creditId/locks', function (req, res) {
        setTimeout(function () {
            console.log('get credits locks');
            res.send(data.credits_locks);
        }, 500);
    });

}
