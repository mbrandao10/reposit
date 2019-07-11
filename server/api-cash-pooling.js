const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");

var data = {
     getcashpoolingaccounts: JSON.parse(fs.readFileSync(RAML_folder + '/cash-pooling/cash-pooling/accounts-cash-pooling-collection.json', 'utf8')),
     getcashpoolingrelationShip: JSON.parse(fs.readFileSync(RAML_folder + '/cash-pooling/cash-pooling/dataCatalog/relation-types.json', 'utf8')),
}

module.exports = function(app, common) {

    app.get('/api-cash-pooling/cash-pooling/accounts/:accountId', function(req, res) {
        setTimeout(function() {
            console.log('Cashpooling');
            res.send(data.getcashpoolingaccounts);
        }, 500);
    });

    app.get('/api-cash-pooling/cash-pooling/dataCatalogs/relationTypes', function(req, res) {
        setTimeout(function() {
            console.log('Cashpooling relationShip');
            res.send(data.getcashpoolingrelationShip);
        }, 500);
    });

}