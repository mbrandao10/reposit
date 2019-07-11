const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");

var data = {

    directDebits: JSON.parse(fs.readFileSync(ACM_folder + '/directDebits/directDebit-contracts-collection.json', 'utf8')),
    directDebit: JSON.parse(fs.readFileSync(ACM_folder + '/directDebits/directDebit-contract-detail.json', 'utf8')),
    directDebit_payments: JSON.parse(fs.readFileSync(ACM_folder + '/directDebits/directDebit-payments-collection.json', 'utf8')),
    directDebit_paymentsStatus: JSON.parse(fs.readFileSync(ACM_folder + '/directDebits/dataCatalog/payment-status-types.json', 'utf8')),
    directDebit_paymentsReturn: JSON.parse(fs.readFileSync(ACM_folder + '/directDebits/dataCatalog/payment-return-receipt.json', 'utf8')),
    directDebit_enterpriseServices: JSON.parse(fs.readFileSync(ACM_folder + '/directDebits/directDebit-enterpriseServices-collection.json', 'utf8')),
    directDebit_refundPayments: JSON.parse(fs.readFileSync(ACM_folder + '/directDebits/directDebit-refundPayments-collection.json', 'utf8'))
}

module.exports = function (app, common) {

    app.get('/api-direct-debits/direct-debits/contracts/:contractId/payments', function (req, res) {
        setTimeout(function () {
            console.log('directDebit payments');
            res.send(data.directDebit_payments);
        }, 500);
    });

    app.get('/api-direct-debits/direct-debits/contracts/:account/refundPayments', function (req, res) {
        setTimeout(function () {
            console.log('directDebit refundPayments');
            res.send(data.directDebit_refundPayments);
        }, 500);
    });


    app.get('/api-direct-debits/direct-debits/contracts', function (req, res) {
        setTimeout(function () {
            console.log('directDebits contracts');
            res.send(data.directDebits);
        }, 500);
    });

    app.post('/api-direct-debits/direct-debits/contracts', function (req, res) {
        setTimeout(function () {
            console.log('post directDebit contract');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.get('/api-direct-debits/direct-debits/contracts/:contractId', function (req, res) {
        setTimeout(function () {
            console.log('directDebit contract');
            res.send(data.directDebit);
        }, 500);
    });

    app.put('/api-direct-debits/direct-debits/contracts/:contractId', function (req, res) {
        setTimeout(function () {
            console.log('put directDebit contract');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.delete('/api-direct-debits/direct-debits/contracts/:contractId', function (req, res) {
        setTimeout(function () {
            console.log('delete directDebit contract');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.put('/api-direct-debits/direct-debits/contracts/:contractId/payments/:paymentId/params/:paramId', function (req, res) {
        setTimeout(function () {
            console.log('delete directDebit payments');
            res.send({ "result": { "code": "200", "info": "OK" } });
        }, 500);
    });

    app.delete('/api-direct-debits/direct-debits/contracts/:contractId/payments/:paymentId', function (req, res) {
        setTimeout(function () {
            console.log('delete directDebit payments');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.get('/api-direct-debits/direct-debits/enterpriseServices/', function (req, res) {
        setTimeout(function () {
            console.log('directDebit enterprise serviced');
            res.send(data.directDebit_enterpriseServices);
        }, 500);
    });

    app.get('/api-direct-debits/direct-debits/dataCatalogs/paymentStatus', function (req, res) {
        setTimeout(function () {
            console.log('directDebit paymentsStatus');
            res.send(data.directDebit_paymentsStatus);
        }, 500);
    });

    app.get('/api-direct-debits/direct-debits/dataCatalogs/paymentsReturn', function (req, res) {
        setTimeout(function () {
            console.log('directDebit paymentsReturn');
            res.send(data.directDebit_paymentsReturn);
        }, 500);
    });

}