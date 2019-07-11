const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");

var data = {

    express_bill_contracts: JSON.parse(fs.readFileSync(RAML_folder + '/express-bill/expressbill/contracts-example-collection.json', 'utf8')),
    express_bill_orders: JSON.parse(fs.readFileSync(RAML_folder + '/express-bill/expressbill/orders-example-collection.json', 'utf8')),
    express_bill_order_types: JSON.parse(fs.readFileSync(RAML_folder + '/express-bill/expressbill/dataCatalog/orders-status-types.json', 'utf8')),
    express_bill_remittances: JSON.parse(fs.readFileSync(RAML_folder + '/express-bill/expressbill/remittances-example-collection.json', 'utf8')),
    express_bill_remittance_types: JSON.parse(fs.readFileSync(RAML_folder + '/express-bill/expressbill/dataCatalog/remittance-status-types.json', 'utf8')),
    express_bill_suppliers: JSON.parse(fs.readFileSync(RAML_folder + '/express-bill/expressbill/suppliers-example-collection.json', 'utf8')),
    express_bill_advances: JSON.parse(fs.readFileSync(RAML_folder + '/express-bill/expressbill/advance-orders-example-collection.json', 'utf8')),
    express_bill_advance: JSON.parse(fs.readFileSync(RAML_folder + '/express-bill/expressbill/advance-order-detail.json', 'utf8')),
    express_bill_advance_simulation: JSON.parse(fs.readFileSync(RAML_folder + '/express-bill/expressbill/advance-order-simulation.json', 'utf8')),
    express_bill_contract: JSON.parse(fs.readFileSync(RAML_folder + '/express-bill/expressbill/contract-example-detail.json', 'utf8')),
    express_bill_remittance_file_response: JSON.parse(fs.readFileSync(RAML_folder + '/express-bill/expressbill/file-details-example.json', 'utf8')),
    express_bill_supplier_countries: JSON.parse(fs.readFileSync(RAML_folder + '/express-bill/expressbill/dataCatalog/supplier-countries.json', 'utf8')),

}

module.exports = function (app, common) {

    app.get('/api-express-bill/express-bill/suppliers', function (req, res) {
        console.log('get express-bill suppliers');
        res.send(data.express_bill_suppliers);
    });

    app.get('/api-express-bill/express-bill/advances', function (req, res) {
        console.log('get express-bill advances');
        res.send(data.express_bill_advances);
    });

    app.get('/api-express-bill/express-bill', function (req, res) {
        console.log('get express-bill contracts');
        res.send(data.express_bill_contracts);
    });

    app.get('/api-express-bill/express-bill/dataCatalogs/orderStatusTypes', function (req, res) {
        console.log('get express-bill order types');
        res.send(data.express_bill_order_types);
    });

    app.get('/api-express-bill/express-bill/dataCatalogs/remittanceStatusTypes', function (req, res) {
        console.log('get express-bill remittance types');
        res.send(data.express_bill_remittance_types);
    });

    app.get('/api-express-bill/express-bill/dataCatalogs/supplierCountries', function (req, res) {
        console.log('get express-bill supplier countries');
        res.send(data.express_bill_supplier_countries);
    });

    app.post('/api-express-bill/express-bill/advances/:orderId/_advance/_simulate', function (req, res) {
        console.log('post express-bill order advance simulate')
        res.send(data.express_bill_advance_simulation);
    });
    
    app.post('/api-express-bill/express-bill/advances/:orderId/_advance', function (req, res) {
        console.log('post express-bill order advance')
        if (!req.headers['x-signature-transaction']) {
            res.status(400).send(common.error400Signature);
        } else {
            res.send(data.express_bill_advance_simulation);
        }
    });


    app.post('/api-express-bill/express-bill', function (req, res) {
        console.log('post express-bill new contract')
        if (!req.headers['x-signature-transaction']) {
            res.status(400).send(common.error400Signature);
        } else {
            res.send(common.success200);
        }
    });


    app.post('/api-express-bill/express-bill/bulk-uploader/:contractId/_uploadFile', function (req, res) {
        console.log('post express-bill remittances');
        res.send(data.express_bill_remittance_file_response);
    });

    app.post('/api-express-bill/express-bill/bulk-uploader/:contractId/_confirmUpload', function (req, res) {
        console.log('post express-bill remittances confirm');
        if (!req.headers['x-signature-transaction'])
            res.status(400).send(common.error400Signature);
        else {
            res.send(common.success200);
        }
    });

    app.get('/api-express-bill/express-bill/:contractId/remittances', function (req, res) {
        console.log('get express-bill remittances');
        res.send(data.express_bill_remittances);
    });

    app.get('/api-express-bill/express-bill/:contractId/orders', function (req, res) {
        console.log('get express-bill orders');
        res.send(data.express_bill_orders);
    });

    app.post('/api-express-bill/express-bill/:contractId/orders', function (req, res) {
        console.log('post express-bill order');
        if (!req.headers['x-signature-transaction'])
            res.status(400).send(common.error400Signature);
        else {
            res.send(common.success200);
        }
    });

    app.get('/api-express-bill/express-bill/:contractId', function (req, res) {
        console.log('get express-bill contract');
        res.send(data.express_bill_contract);
    });
}