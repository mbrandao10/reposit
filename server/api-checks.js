const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");

var data = {

    checks: JSON.parse(fs.readFileSync(RAML_folder + '/checks/cheques/cheque-books-issued-collection.json', 'utf8')),
    checksStatus: JSON.parse(fs.readFileSync(RAML_folder + '/checks/cheques/dataCatalog/cheques-status-types.json', 'utf8')),

}

module.exports = function (app, common) {

    app.get('/api-cheques/cheques', function (req, res) {
        console.log('get checks');
        res.send(data.checks);
    });

    app.get('/api-cheques/cheques/dataCatalogs/chequeStatusTypes', function (req, res) {
        console.log('get check status');
        res.send(data.checksStatus);
    })
}