const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");

var data = {

    getLoans: JSON.parse(fs.readFileSync(ACM_folder + '/loans/loans-example-collection.json', 'utf8')),
    getPreGranted: JSON.parse(fs.readFileSync(ACM_folder + '/loans/loan-pregranted-info.json', 'utf8')),
    getCreditMatrix: JSON.parse(fs.readFileSync(ACM_folder + '/loans/credit-matrix-response.json', 'utf8')),
    getLoanDetail: JSON.parse(fs.readFileSync(ACM_folder + '/loans/loan-example-detail.json', 'utf8')),
    getLoansRepayments: JSON.parse(fs.readFileSync(ACM_folder + '/loans/loan-repayments-example.json', 'utf8')),
    getLoansReceipts: JSON.parse(fs.readFileSync(ACM_folder + '/loans/loan-receipts-example.json', 'utf8')),
    postLoanSimulate: JSON.parse(fs.readFileSync(ACM_folder + '/loans/amortization-simulation-example.json', 'utf8')),
    getLoansTypes: JSON.parse(fs.readFileSync(ACM_folder + '/loans/dataCatalog/amortization-types.json', 'utf8')),
    getAlias: JSON.parse(fs.readFileSync(ACM_folder + '/loans/alias-example.json', 'utf8')),
    getLoanSimulateCancel: JSON.parse(fs.readFileSync(ACM_folder + '/loans/loan-simulateCancel-example.json', 'utf8')),
    getLoanProduct: JSON.parse(fs.readFileSync(RAML_folder + '/loans/loans/loans-products-detail.json', 'utf8')),

}

module.exports = function (app, common) {

    app.get('/api-loans/loans', function (req, res) {
        setTimeout(function () {
            console.log('Getting loans');
            res.send(data.getLoans);
        }, 500);
    })

    app.post('/api-loans/loans', function (req, res) {
        setTimeout(function () {
            if (!req.headers['x-signature-transaction']) {
                res.status(400).send(common.error400Signature);
            } else {
                console.log('Posting loan');
                res.send({
                    "result": {
                        "code": "201",
                        "info": "Created"
                    },
                    "data": {
                        "id": "329800735698586629295641978511506172918"
                    }
                });
            }
        }, 500);
    })

    app.get('/api-loans/loans/pre-granted', function (req, res) {
        setTimeout(function () {
            console.log('Getting loans pre-granted');
            res.send(data.getPreGranted);
        }, 500);
    })

    app.get('/api-loans/loans/pre-granted/:productCode/creditMatrix', function (req, res) {
        setTimeout(function () {
            console.log('Getting loans creditMatrix');
            res.send(data.getCreditMatrix);
        }, 500);
    })

    app.get('/api-loans/loans/:id/repayments', function (req, res) {
        setTimeout(function () {
            console.log('Getting loans repayments');
            res.send(data.getLoansRepayments);
        }, 500);
    })

    app.get('/api-loans/loans/:id/receipts', function (req, res) {
        setTimeout(function () {
            console.log('Getting loans receipts');
            res.send(data.getLoansReceipts);
        }, 500);
    })

    app.put('/api-loans/loans/:id/alias', function (req, res) {
        setTimeout(function () {
            console.log('account update alias');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.get('/api-loans/loans/:id/alias', function (req, res) {
        setTimeout(function () {
            console.log('account getting alias');
            res.send(data.accountAlias);
        }, 500);
    });

    app.get('/api-loans/loans/:id/_simulateCancel', function (req, res) {
        setTimeout(function () {
            console.log('Simulating cancel loan');
            res.send(data.getLoanSimulateCancel);
        }, 500);
    })

    app.get('/api-loans/loans/:id', function (req, res) {
        setTimeout(function () {
            console.log('Getting loan detail');
            res.send(data.getLoanDetail);
        }, 500);
    })

    app.delete('/api-loans/loans/:id', function (req, res) {
        setTimeout(function () {
            console.log('Delete loan');
            res.send('{"result": {"code": "200","info": "OK"}}');
        }, 500);
    });

    app.get('/api-loans/loans/dataCatalogs/repaymentTypes', function (req, res) {
        setTimeout(function () {
            console.log('Getting loan types');
            res.send(data.getLoansTypes);
        }, 500);
    })

    app.post('/api-loans/loans/:id/repayments/simulate', function (req, res) {
        setTimeout(function () {
            console.log('Simulating loan amortization');
            res.send(data.postLoanSimulate);
        }, 500);
    })

    app.post('/api-loans/loans/:id/repayments', function (req, res) {
        setTimeout(function () {
            console.log('Executing loan amortization');
            res.send(data.postLoanSimulate);
        }, 500);
    })

    app.post('/api-loans/loans/pre-granted', function (req, res) {
        setTimeout(function () {
            console.log('Set loans pre-granted');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    })

    app.get('/api-loans/loans/products/:productCode', function (req, res) {
        setTimeout(function () {
            console.log('Getting loan products');
            res.send(data.getLoanProduct);
        }, 500);
    })

}