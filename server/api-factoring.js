const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");

var data = {

    factoring_contracts: JSON.parse(fs.readFileSync(RAML_folder + '/factoring/factoring/contracts-example-collection.json', 'utf8')),
    factoring_contract: JSON.parse(fs.readFileSync(RAML_folder + '/factoring/factoring/contract-example-detail.json', 'utf8')),
    // factoring_contract: JSON.parse(fs.readFileSync(RAML_folder + '/factoring/factoring/contract-example-detail-varInterest.json', 'utf8')),
    factoring_invoices: JSON.parse(fs.readFileSync(RAML_folder + '/factoring/factoring/invoices-example-collection.json', 'utf8')),
    factoring_invoice: JSON.parse(fs.readFileSync(RAML_folder + '/factoring/factoring/invoice-example-detail.json', 'utf8')),
    factoring_invoices_types: JSON.parse(fs.readFileSync(RAML_folder + '/factoring/factoring/dataCatalog/invoices-status-types.json', 'utf8')),
    factoring_invoice_simulation: JSON.parse(fs.readFileSync(RAML_folder + '/factoring/factoring/advance-simulation.json', 'utf8')),
    factoring_invoice_file: JSON.parse(fs.readFileSync(RAML_folder + '/factoring/factoring/file-details-example.json', 'utf8')),
  
}

module.exports = function (app, common) {

    app.get('/api-factoring/factoring', function (req, res) {
        console.log('get factoring contracts');
        res.send(data.factoring_contracts);
    });

    app.post('/api-factoring/factoring', function (req, res) {
        console.log('post factoring contracts');
        if (!req.headers['x-signature-transaction']) {
            res.status(400).send(common.error400Signature);
        } else {
            res.send(common.success200);
        }
    });

    app.get('/api-factoring/factoring/:contractId', function (req, res) {
        console.log('get factoring contract');
        res.send(data.factoring_contract);
    });

    app.get('/api-factoring/factoring/:contractId/invoices', function (req, res) {
        console.log('get factoring invoices');
        res.send(data.factoring_invoices);
    });

    app.get('/api-factoring/factoring/:contractId/invoices/:invoiceId', function (req, res) {
        console.log('get factoring invoices');
        res.send(data.factoring_invoice);
    });

    app.post('/api-factoring/factoring/:contractId/invoices/:invoiceId/advance', function (req, res) {
        console.log('post factoring invoice advance')
        if (!req.headers['x-signature-transaction']) {
            res.status(400).send(common.error400Signature);
        } else {
            res.send(common.success200);
        }
    });

    app.post('/api-factoring/factoring/:contractId/invoices/:invoiceId/advanceSimulation', function (req, res) {
        console.log('post factoring invoice simulation')
        res.send(data.factoring_invoice_simulation);
    });

    app.get('/api-factoring/factoring/dataCatalogs/invoicesStatusTypes', function (req, res) {
        console.log('get factoring order types');
        res.send(data.factoring_invoices_types);
    });

    app.get('/products/factoring', function (req, res) {
        console.log('get factoring products');
        res.send(data.products_confirming);
    });

    app.post('/api-factoring/factoring/invoices-bulk-uploader/:contractId/_uploadFile', function (req, res) {
        console.log('post factoring invoice file');
        res.send(data.factoring_invoice_file);
    });

    app.post('/api-factoring/factoring/invoices-bulk-uploader/:contractId/_confirmUpload', function (req, res) {
        console.log('post factoring invoice file confirm');
        if (!req.headers['x-signature-transaction']) {
            res.status(400).send(common.error400Signature);
        } else {
            res.send(common.success200);
        }
    })

}