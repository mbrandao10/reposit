const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");

var data = {

    leasing_contracts: JSON.parse(fs.readFileSync(RAML_folder + '/leasing/leasing/contracts-example-collection.json', 'utf8')),
    leasing_contract: JSON.parse(fs.readFileSync(RAML_folder + '/leasing/leasing/contract-example-detail.json', 'utf8')),
    leasing_respayments: JSON.parse(fs.readFileSync(RAML_folder + '/leasing/leasing/repayments-example-collection.json', 'utf8')),
   
}

module.exports = function (app, common) {

    app.get('/api-leasing/leasing', function (req, res) {
        console.log('get leasing contracts');
        res.send(data.leasing_contracts);
    });

    app.get('/api-leasing/leasing/:contractId', function (req, res) {
        console.log('get leasing contract');
        res.send(data.leasing_contract);
    });

    app.get('/api-leasing/leasing/:contractId/repayments', function (req, res) {
        console.log('get confirming repayments');
        res.send(data.leasing_respayments);
    });
}