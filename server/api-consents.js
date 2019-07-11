const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");

var data = {
    consents: JSON.parse(fs.readFileSync(ACM_folder + '/consents/ConsentInformationResponse200Json.json', 'utf8'))
}

module.exports = function ( app, common ) {

    app.get('/api-consents/consents', function(req, res){
        console.log('get consents');
        res.send(data.consents);
    });

    app.post('/api-consents/consents/:consentId', function( req, res ){
        setTimeout(function(){
            console.log('saving consents');
            var response = {
                result: {
                    code: 200,
                },
                data: data.consents
            }
            res.send(response);
        }, 500);
    });

    app.delete('/api-consents/consents/:consentId', function(req, res) {
        console.log('delete consents');
        setTimeout(function () {
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });
}