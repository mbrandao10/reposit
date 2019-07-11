const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");

var data = {
     
    payments_pending: JSON.parse(fs.readFileSync(ACM_folder + '/linkPayments/pending-payments-collection-example.json', 'utf8')),
    payments_history: JSON.parse(fs.readFileSync(ACM_folder + '/linkPayments/made-payments-collection-example.json', 'utf8')),
    payments_entities: JSON.parse(fs.readFileSync(ACM_folder + '/linkPayments/entities-collection-example.json', 'utf8')),
    payments_items: JSON.parse(fs.readFileSync(ACM_folder + '/linkPayments/items-collection-example.json', 'utf8')),
    payment_response: JSON.parse(fs.readFileSync(ACM_folder + '/linkPayments/made-payment-response-example.json', 'utf8')),

}

module.exports = function (app, common) {

    app.get('/linkPayments/payments', function (req, res) {
        setTimeout(function () {
            console.log('payments');
            res.send(data.payments_pending);
        }, 500);
    });

    app.post('/linkPayments/payments', function (req, res) {
        setTimeout(function () {
            console.log('make payment');
            res.send(data.payment_response);
        }, 500);
    });

    app.get('/linkPayments/history', function (req, res) {
        setTimeout(function () {
            console.log('history');
            res.send(data.payments_history);
        }, 500);
    });

    app.get('/linkPayments/entities', function (req, res) {
        setTimeout(function () {
            console.log('entities');
            res.send(data.payments_entities);
        }, 500);
    });

    app.get('/linkPayments/items', function (req, res) {
        setTimeout(function () {
            console.log('items');
            res.send(data.payments_items);
        }, 500);
    });
    
}