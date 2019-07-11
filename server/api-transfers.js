const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");

var data = {

    postTransfersSimulateResponse: JSON.parse(fs.readFileSync(RAML_folder + '/transfers/transfers/domestic/simulate-post-response.json', 'utf8')),

    getFavourites: JSON.parse(fs.readFileSync(RAML_folder + '/transfers/transfers/favorites/get-favorites-collection.json', 'utf8')),
    getFrecuencyTypesResponse: JSON.parse(fs.readFileSync(RAML_folder + '/transfers/transfers/dataCatalog/frequency-types.json', 'utf8')),
    getCurrencies: JSON.parse(fs.readFileSync(RAML_folder + '/common/common/dataCatalog/currencies-types.json', 'utf8')),
    getCharges: JSON.parse(fs.readFileSync(RAML_folder + '/transfers/transfers/dataCatalog/transfer-charges-types.json', 'utf8')),
    getTransferResponse: JSON.parse(fs.readFileSync(RAML_folder + '/transfers/transfers/get-transfers-colecction.json', 'utf8')),
    postResponse: JSON.parse(fs.readFileSync(RAML_folder + '/transfers/transfers/domestic/post-response.json', 'utf8')),
    getScheduledTransfer: JSON.parse(fs.readFileSync(RAML_folder + '/transfers/transfers/periodic-domestic/periodic-collection.json', 'utf8')),
    putScheduledTransfer: JSON.parse(fs.readFileSync(RAML_folder + '/transfers/transfers/periodic-domestic/periodic-collection.json', 'utf8')),
    getTransferModes: JSON.parse(fs.readFileSync(RAML_folder + '/transfers/transfers/dataCatalog/transfer-modes.json', 'utf8')),
    getPurposeTypes: JSON.parse(fs.readFileSync(RAML_folder + '/transfers/transfers/dataCatalog/purpose-types.json', 'utf8')),
    getBeneficiaryCountries: JSON.parse(fs.readFileSync(RAML_folder + '/transfers/transfers/dataCatalog/transfer-countries.json', 'utf8')),

    /*getTransferResponse: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/domestic/get-transfers-colecction.json', 'utf8')),
    getTransferId: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/domestic/get-transfer-detail.json', 'utf8')),
    putTransferId: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/domestic/get-transfer-detail.json', 'utf8')),
    // Periodicos
    getPeriodicDetail: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/periodic-domestic/periodic-detail-get-response.json', 'utf8')),
    postPeriodicResponse: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/periodic-domestic/signature-required.json', 'utf8')),
    putPeriodicDelete: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/periodic-domestic/signature-required.json', 'utf8')),
    // DataCatalogs
    getAccountFormats: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/dataCatalog/account-formats.json', 'utf8')),
    getLegalDocumentTypes: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/dataCatalog/legal-document-types.json', 'utf8')),
    getFrecuencyTypes: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/dataCatalog/frequency-types.json', 'utf8')),
    getTransferTypes: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/dataCatalog/transfer-types.json', 'utf8')),
    getTransferStates: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/dataCatalog/transfer-states.json', 'utf8')),
    getPurposeTypes: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/dataCatalog/purpose-types.json', 'utf8')),


    favoriteGetResponse: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/favorite-get-response.json', 'utf8')),
    periodicGetResponse: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/automated-collection.json', 'utf8')),
    getReasonTypesResponse: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/dataCatalog/reason-types.json', 'utf8')),
    getFavoriteTransferIdResponse: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/favorite-detail-get-response.json', 'utf8')),
    // getTransferResponse: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/get-transfers-colecction.json', 'utf8')),
    postTransferResponse: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/post-response.json', 'utf8')),
    getPeriodicDetailResponse: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/periodic-detail-get-response.json', 'utf8')),
    postTransfersSimulateResponse: JSON.parse(fs.readFileSync(ACM_folder + '/transfers/simulate-post-response.json', 'utf8')),
    
    transferToATM_orders: JSON.parse(fs.readFileSync(ACM_folder + '/transferToATM/orders-collection.json', 'utf8')),
    transferToATM_new_order_response: JSON.parse(fs.readFileSync(ACM_folder + '/transferToATM/new-order-response.json', 'utf8')),
    transferToATM_document_types: JSON.parse(fs.readFileSync(ACM_folder + '/transferToATM/ode-documentTypes.json', 'utf8')),
    transferToATM_documents: JSON.parse(fs.readFileSync(ACM_folder + '/transferToATM/ode-documents.json', 'utf8')),
    transferToATM_references: JSON.parse(fs.readFileSync(ACM_folder + '/transferToATM/ode-references.json', 'utf8')),
    */
}

module.exports = function(app, common) {

    app.get('/api-transfers/transfers', function(req, res) {
        console.log('get /transfers/');
        res.send(data.getTransferResponse);

    });
    let count = 1;
    app.post('/api-transfers/transfers', function(req, res) {
        console.log('get /transfers/');
       // res.status(400).send(common.error400SignatureOtp);
       // res.status(202).send(data.postResponse);
       setTimeout(function() {
            console.log('Put change pwd');
            if(count===1){
                count++;
              res.status(400).send(common.error400Signature);
            }
            else if(count===2){
                count++;
                res.status(400).send(common.error400SignatureOtp);
            } else if(count===3){
                count++;
                res.status(400).send(common.error500);
            }
            else{
                count = 1;
                res.send({
                    "result": {
                        "code": "200",
                        "info": "OK"
                      }
                });
            }

           

        }, 500);

    });

    app.post('/api-transfers/transfers/_simulate', function(req, res) {
        console.log('get /transfers/_simulate');
        res.send(data.postTransfersSimulateResponse);

    });

    app.post('/api-transfers/transfers/scheduled', function(req, res) {
        console.log('post /transfers/scheduled');
        if (!req.headers['x-signature-transaction'])
            res.status(400).send(common.error400Signature);
        else {
            res.send(common.success200);
        }
    });



    app.post('/transfers/periodic', function(req, res) {
        console.log('post /transfers/periodic');
        if (!req.headers['x-signature-transaction'])
            res.status(400).send(common.error400Signature);
        else {
            res.send(common.success200);
        }
    });

    app.get('/api-transfers/transfers/scheduled', function(req, res) {
        res.send(data.getScheduledTransfer);
    });

    app.put('/api-transfers/transfers/scheduled/:transferid', function(req, res) {

        console.log("David:" + req.headers['x-signature-transaction']);

        setTimeout(function() {
            console.log('post new req');
            if (!req.headers['x-signature-transaction'])
                res.status(400).send(common.error400Signature);
            else {
                res.send({
                    "result": {
                        "code": "200",
                        "info": "OK"
                    }
                });
            }
        }, 500);
    });


    app.post('/api-transfers/transfers/scheduled/_simulate', function(req, res) {
        console.log('get /transfers/scheduled/_simulate');
        res.send(data.postTransfersSimulateResponse);

    });

    app.get('/api-transfers/transfers/dataCatalogs/frecuencyTypes', function(req, res) {
        console.log('get /transfers/dataCatalogs/frecuencyTypes');
        res.send(data.getFrecuencyTypesResponse);

    });

    app.get('/api-transfers/transfers/dataCatalogs/currencies', function(req, res) {
        console.log('get /transfers/dataCatalogs/currencies');
        res.send(data.getCurrencies);
    });

    app.get('/api-transfers/transfers/dataCatalogs/transferModes', function(req, res) {
        console.log('get /transfers/dataCatalogs/transferModes');
        res.send(data.getTransferModes);
    });

    app.get('/api-transfers/transfers/dataCatalogs/countries', function(req, res) {
        console.log('get /transfers/dataCatalogs/beneficiaryCountries');
        res.send(data.getBeneficiaryCountries);
    });

    app.post('/api-transfers/transfers/favorites', function(req, res) {
        console.log('post transfers favourites');
        res.send(common.success200);
    });


    app.get('/api-transfers/transfers/favorites', function(req, res) {
        console.log('get transfers favourites [mockeadas]');
        res.send(data.getFavourites);
    });

    app.delete('/api-transfers/transfers/favorites/:favoriteId', function(req, res) {
        console.log('delete transfer favourites [mockeadas]');
        res.send(common.success200);
    });

     app.get('/api-transfers/transfers/dataCatalogs/transferCharges',function(req, res) {
        console.log('get /transfers/dataCatalogs/transferCharges');
        res.send(data.getCharges);
    });

    app.get('/api-transfers/transfers/dataCatalogs/purposeTypes',function(req, res) {
        console.log('get /transfers/dataCatalogs/purposeTypes');
        res.send(data.getPurposeTypes);
    });


}