const path = require("path");
var fs = require('fs');

var ACM_folder = path.resolve(__dirname, "../mocks");
var RAML_folder = path.resolve(__dirname, "../raml");

var data = {

    //
    //**** info ****
    //


    user_info: JSON.parse(fs.readFileSync(RAML_folder + '/users/users/user-info-example.json', 'utf8')),
    login: JSON.parse(fs.readFileSync(ACM_folder + '/security/login.json', 'utf8')),
    setProfile: JSON.parse(fs.readFileSync(ACM_folder + '/security/profile.json', 'utf8')),


    //
    //**** foreing operations*****/
    //
    exchange_currency: JSON.parse(fs.readFileSync(ACM_folder + '/foreign-operations/exchange-collection-example.json', 'utf8')),


    currenciesGetResponse: JSON.parse(fs.readFileSync(ACM_folder + '/common/dataCatalog/currencies-types.json', 'utf8')),
    //products_confirming: JSON.parse(fs.readFileSync(RAML_folder + '/products/products/accounts-products-collection.json', 'utf8')),


    link_accounts: JSON.parse(fs.readFileSync(ACM_folder + '/wanap-services/link-accounts-collection.json', 'utf8')),
    // made-payment-response-example.json
    config_resource: JSON.parse(fs.readFileSync(ACM_folder + '/resource/config.json', 'utf8')),

};

module.exports = function(app, common) {

    app.post('/auth-server/oauth/token', function(req, res) {
        //res.send(401);
        setTimeout(function() {
            console.log('login');
            res.send(data.login);
        }, 500);
    });

    app.get('/api-users/users/me', function(req, res) {
        setTimeout(function() {
            console.log('/users/me');
            res.send(data.user_info);
        }, 500);
    });

    app.post('/api-channel-services/renderPdf/:id', function(req, res) {
        var file = fs.createReadStream('./mocks/test.pdf');
        var stat = fs.statSync('./mocks/test.pdf');
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
        file.pipe(res);
    });


    app.post('/set_profile', function(req, res) {
        setTimeout(function() {
            console.log('set_profile');
            res.send(data.setProfile);
        }, 500);
    });

    app.delete('/user/session', function(req, res) {
        setTimeout(function() {
            console.log('remember pwd');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    ////////////////////////////////////////////
    /////////////FOREING OPERATIONS//////////////
    /////////////////////////////////////////////

    app.get('/api-foreign-operations/foreign-operations/currencyExchange', function(req, res) {
        setTimeout(function() {
            console.log('exchange_currency');
            res.send(data.exchange_currency);
        }, 500);
    });


    app.get('/common/dataCatalog/currencies', function(req, res) {
        setTimeout(function() {
            console.log('/common/dataCatalog/currencies');
            res.send(data.currenciesGetResponse);
        }, 500);
    });


    var count=1;
    app.put('/api-users/users/me/password', function(req, res) {
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
                res.send({
                    "result": {
                        "code": "200",
                        "info": "OK"
                      }
                });
            }          

        }, 500);
    });

    var countKey=1;
    app.put('/api-users/users/me/signatureKey', function(req, res) {
        setTimeout(function() {
            console.log('Put change code user');
            if(countKey===1){
                countKey++;
              res.status(400).send(common.error400Signature);
            }
            else if(countKey===2){
                countKey++;
                res.status(400).send(common.error400SignatureOtp);
            } else if(countKey===3){
                countKey++;
                res.status(400).send(common.error500);
            }
            else{
                countKey=1;
                res.send({
                    "result": {
                        "code": "200",
                        "info": "OK"
                      }
                });
            }          

        }, 500);
    });

    app.post('/api-users/users/me/card/:action', function(req, res) {
        setTimeout(function() {
            console.log('Put card action');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.delete('/settings/password', function(req, res) {
        setTimeout(function() {
            console.log('remember pwd');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    })


    app.get('/services/link/accounts', function(req, res) {
        setTimeout(function() {
            console.log('getting link accounts');
            res.send(data.link_accounts);
        }, 500);
    });


    app.get('/resource/:name', function(req, res) {
        setTimeout(function() {
            console.log('getting resource name');
            res.send(data.config_resource);
        }, 500);
    });

    /////////////////////////////////////////////
    //////////////////PRODUCTS///////////////////
    /////////////////////////////////////////////


    app.get('/api-products/products/equities', function(req, res) {
        setTimeout(function() {
            console.log('productos asociables a valores');
            res.send(data.equityProducts);
        }, 500);
    });


    app.get('/products/confirming', function(req, res) {
        console.log('get confirming products');
        res.send('');
    });


    app.get('/products/factoring', function(req, res) {
        console.log('get factoring products');
        res.send('');
    });





}