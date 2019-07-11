const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");

var data = {

    sepa_upload_file: JSON.parse(fs.readFileSync(RAML_folder + '/sepa-files/sepa-files/file-details-example.json', 'utf8')),
    sepa_remittances: JSON.parse(fs.readFileSync(RAML_folder + '/sepa-files/sepa-files/remittances-example-collection.json', 'utf8')),
    sepa_remittance: JSON.parse(fs.readFileSync(RAML_folder + '/sepa-files/sepa-files/remittance-example-detail.json', 'utf8')),
    sepa_orders_c19: JSON.parse(fs.readFileSync(RAML_folder + '/sepa-files/sepa-files/orders-c19-example-collection.json', 'utf8')),
    sepa_orders_c34: JSON.parse(fs.readFileSync(RAML_folder + '/sepa-files/sepa-files/orders-c34-example-collection.json', 'utf8')),
    sepa_receiptsReturned_remittance: JSON.parse(fs.readFileSync(RAML_folder + '/sepa-files/sepa-files/remittance-returns-receipts-collection.json', 'utf8')),
    sepa_remittances_returns: JSON.parse(fs.readFileSync(RAML_folder + '/sepa-files/sepa-files/remittance-returns-collection.json', 'utf8')),
    sepa_fileFormats: JSON.parse(fs.readFileSync(RAML_folder + '/sepa-files/sepa-files/dataCatalog/file-formats.json', 'utf8')),
    sepa_remittanceStatusTypes: JSON.parse(fs.readFileSync(RAML_folder + '/sepa-files/sepa-files/dataCatalog/remittance-status-types.json', 'utf8')),
    sepa_returnsReasons: JSON.parse(fs.readFileSync(RAML_folder + '/sepa-files/sepa-files/dataCatalog/returns-reasons.json', 'utf8')),
    sepa_returns_senders: JSON.parse(fs.readFileSync(RAML_folder + '/sepa-files/sepa-files/remittance-sender-returns.json', 'utf8'))

}

module.exports = function (app, common) {

    /////////////////////////////////////////////
    /////////////////////SEPA////////////////////
    /////////////////////////////////////////////

    app.post('/api-sepa-files/sepa-files/bulk-uploader/_uploadFile', function (req, res) {
        console.log('post sepa upload file');
        res.send(data.sepa_upload_file);
    });

    app.get('/api-sepa-files/sepa-files/dataCatalogs/fileFormats', function (req, res) {
        console.log('get sepa fileFormats');
        res.send(data.sepa_fileFormats);
    });

    app.post('/api-sepa-files/sepa-files/bulk-uploader/_confirmUpload', function (req, res) {
        console.log('post sepa confirm file');
        if (!req.headers['x-signature-transaction'])
            res.status(400).send(common.error400Signature);
        else {
            res.send(common.success200);
        }
    });

    app.get('/api-sepa-files/sepa-files/remittances/:type', function (req, res) {
        console.log('get sepa remittances');
        res.send(data.sepa_remittances);
    })

    app.get('/api-sepa-files/sepa-files/dataCatalogs/remittanceStatusTypes', function (req, res) {
        console.log('get sepa remittanceStatusTypes');
        res.send(data.sepa_remittanceStatusTypes);
    });
    app.get('/api-sepa-files/sepa-files/remittances/returns/sender', function (req, res) {
        console.log('get sepa remittances returns senders');
        res.send(data. sepa_returns_senders);
    });

    app.get('/api-sepa-files/sepa-files/remittances/returns', function (req, res) {
        console.log('get sepa remittances returns');
        res.send(data.sepa_remittances_returns);
    });

    app.get('/api-sepa-files/sepa-files/remittances/:type/:remittanceId', function (req, res) {
        console.log('get sepa remittanceDetail');
        var sepa_remittance = data.sepa_remittance;
        sepa_remittance.data.id = req.params.remittanceId;
        if (req.params.remittanceId === 'REM00001') {
            sepa_remittance.data.fileType = {
                id: 'AEB34.14',
                name: 'AEB34.14 - Transferencias SEPA'
            };
        } else {
            sepa_remittance.data.fileType = {
                id: "AEB19.14",
                name: "AEB19.14 - Domiciliaciones SEPA"
            };
        }
        res.send(data.sepa_remittance);
    });

    app.get('/api-sepa-files/sepa-files/remittances/:type/:remittanceId/orders', function (req, res) {
        console.log('get sepa remittanceDetail orders');
        if (req.params.remittanceId === 'REM00001') {
            res.send(data.sepa_orders_c34);
        } else {
            res.send(data.sepa_orders_c19);
        }
    });
}