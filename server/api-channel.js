const path = require("path");
var fs = require('fs');

var ACM_folder = path.resolve(__dirname, "../mocks");
var RAML_folder = path.resolve(__dirname, "../raml");

var data = {
    
}

module.exports = function(app, common) {

    app.post('/renderPdf/:name', function(req, res) {        
        res.send({
            "result": {
                "code": "200",
                "info": "OK"
            }
        });
    });

}