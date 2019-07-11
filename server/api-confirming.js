const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");

var data = {

    confirming_contracts: JSON.parse(fs.readFileSync(RAML_folder + '/confirming/confirming/contracts-example-collection.json', 'utf8')),
    confirming_orders: JSON.parse(fs.readFileSync(RAML_folder + '/confirming/confirming/orders-example-collection.json', 'utf8')),
    confirming_order_types: JSON.parse(fs.readFileSync(RAML_folder + '/confirming/confirming/dataCatalog/orders-status-types.json', 'utf8')),
    confirming_remittances: JSON.parse(fs.readFileSync(RAML_folder + '/confirming/confirming/remittances-example-collection.json', 'utf8')),
    confirming_remittance_types: JSON.parse(fs.readFileSync(RAML_folder + '/confirming/confirming/dataCatalog/remittance-status-types.json', 'utf8')),
    confirming_suppliers: JSON.parse(fs.readFileSync(RAML_folder + '/confirming/confirming/suppliers-example-collection.json', 'utf8')),
    confirming_advances: JSON.parse(fs.readFileSync(RAML_folder + '/confirming/confirming/advance-orders-example-collection.json', 'utf8')),
    confirming_advance: JSON.parse(fs.readFileSync(RAML_folder + '/confirming/confirming/advance-order-detail.json', 'utf8')),
    confirming_advance_simulation: JSON.parse(fs.readFileSync(RAML_folder + '/confirming/confirming/advance-order-simulation.json', 'utf8')),
    confirming_contract: JSON.parse(fs.readFileSync(RAML_folder + '/confirming/confirming/contract-example-detail.json', 'utf8')),
    confirming_remittance_file_response: JSON.parse(fs.readFileSync(RAML_folder + '/confirming/confirming/file-details-example.json', 'utf8')),
    confirming_supplier_countries: JSON.parse(fs.readFileSync(RAML_folder + '/confirming/confirming/dataCatalog/supplier-countries.json', 'utf8')),

}

module.exports = function (app, common) {

    app.get('/api-confirming/confirming/suppliers', function (req, res) {
        console.log('get confirming suppliers');
        res.send(data.confirming_suppliers);
    });

    app.get('/api-confirming/confirming/advances', function (req, res) {
        console.log('get confirming advances');
        res.send(data.confirming_advances);
    });

    app.get('/api-confirming/confirming', function (req, res) {
        console.log('get confirming contracts');
        res.send(data.confirming_contracts);
    });

    app.get('/api-confirming/confirming/dataCatalogs/orderStatusTypes', function (req, res) {
        console.log('get confirming order types');
        res.send(data.confirming_order_types);
    });

    app.get('/api-confirming/confirming/dataCatalogs/remittanceStatusTypes', function (req, res) {
        console.log('get confirming remittance types');
        res.send(data.confirming_remittance_types);
    });

    app.get('/api-confirming/confirming/dataCatalogs/supplierCountries', function (req, res) {
        console.log('get confirming supplier countries');
        res.send(data.confirming_supplier_countries);
    });

    app.post('/api-confirming/confirming/advances/:orderId/_advance/_simulate', function (req, res) {
        console.log('post confirming order advance simulate')
        res.send(data.confirming_advance_simulation);
    });
    
    app.post('/api-confirming/confirming/advances/:orderId/_advance', function (req, res) {
        console.log('post confirming order advance')
        if (!req.headers['x-signature-transaction']) {
            res.status(400).send(common.error400Signature);
        } else {
            res.send(data.confirming_advance_simulation);
        }
    });


    app.post('/api-confirming/confirming', function (req, res) {
        console.log('post confirming new contract')
        if (!req.headers['x-signature-transaction']) {
            res.status(400).send(common.error400Signature);
        } else {
            res.send(common.success200);
        }
    });


    app.post('/api-confirming/confirming/bulk-uploader/:contractId/_uploadFile', function (req, res) {
        console.log('post confirming remittances');
        res.send(data.confirming_remittance_file_response);
    });

    app.post('/api-confirming/confirming/bulk-uploader/:contractId/_confirmUpload', function (req, res) {
        console.log('post confirming remittances confirm');
        if (!req.headers['x-signature-transaction'])
            res.status(400).send(common.error400Signature);
        else {
            res.send(common.success200);
        }
    });

    app.get('/api-confirming/confirming/:contractId/remittances', function (req, res) {
        console.log('get confirming remittances');
        res.send(data.confirming_remittances);
    });

    app.get('/api-confirming/confirming/:contractId/orders', function (req, res) {
        console.log('get confirming orders');
        res.send(data.confirming_orders);
    });

    app.post('/api-confirming/confirming/:contractId/orders', function (req, res) {
        console.log('post confirming order');
        if (!req.headers['x-signature-transaction'])
            res.status(400).send(common.error400Signature);
        else {
            res.send(common.success200);
        }
    });

    app.get('/api-confirming/confirming/:contractId', function (req, res) {
        console.log('get confirming contract');
        res.send(data.confirming_contract);
    });
}