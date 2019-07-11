const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");

var data = {
    
    debin_accounts_buyer: JSON.parse(fs.readFileSync(ACM_folder + '/debin/linked-accounts-buyer.json', 'utf8')),
    debin_accounts_seller: JSON.parse(fs.readFileSync(ACM_folder + '/debin/linked-accounts-seller.json', 'utf8')),
    debin_pending_received: JSON.parse(fs.readFileSync(ACM_folder + '/debin/debin-pending-received.json', 'utf8')),
    debin_pending_sent: JSON.parse(fs.readFileSync(ACM_folder + '/debin/debin-pending-sent.json', 'utf8')),
    debin_detail: JSON.parse(fs.readFileSync(ACM_folder + '/debin/debin-detail.json', 'utf8')),
    debin_concept_types: JSON.parse(fs.readFileSync(ACM_folder + '/debin/dataCatalog/debin-concept-types.json', 'utf8')),
    debin_period_options: JSON.parse(fs.readFileSync(ACM_folder + '/debin/dataCatalog/debin-preauth-period-options.json', 'utf8')),
    debin_expiration_times: JSON.parse(fs.readFileSync(ACM_folder + '/debin/dataCatalog/debin-expiration-times.json', 'utf8')),
    debin_new_response: JSON.parse(fs.readFileSync(ACM_folder + '/debin/new-debin-response.json', 'utf8')),
    debin_count: JSON.parse(fs.readFileSync(ACM_folder + '/debin/debins-counter-example.json', 'utf8')),
    debin_consumptions: JSON.parse(fs.readFileSync(ACM_folder + '/debin/consumptions-seller.json', 'utf8')),
    debin_limits: JSON.parse(fs.readFileSync(ACM_folder + '/debin/limits-seller.json', 'utf8')),
    debin_status_types: JSON.parse(fs.readFileSync(ACM_folder + '/debin/dataCatalog/debin-preauth-status-types.json', 'utf8')),
    debin_preauth_received: JSON.parse(fs.readFileSync(ACM_folder + '/debin/preauth-debin-received.json', 'utf8')),
    debin_post_preauth_response: JSON.parse(fs.readFileSync(ACM_folder + '/debin/confirm-debin-preauth-response.json', 'utf8')),

}

module.exports = function (app, common) {

    app.post('/debin', function (req, res) {
        setTimeout(function () {
            console.log('post debin');
            res.send(data.debin_new_response);
        }, 500);
    });

    app.post('/debin/_simulate', function (req, res) {
        setTimeout(function () {
            console.log('debin simulate');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    })

    app.get('/debin/linkedAccounts', function (req, res) {
        setTimeout(function () {
            console.log('get linked accounts ' + req.query.role);
            var role = req.query.role;
            if (role === "seller") {
                res.send(data.debin_accounts_seller);
            } else {
                res.send(data.debin_accounts_buyer);
            }
        }, 500);
    });

    app.get('/debin/limits', function (req, res) {
        setTimeout(function () {
            console.log('get debin count');
            res.send(data.debin_limits);
        }, 500);
    });

    app.get('/debin/dataCatalogs/preauth/statusTypes', function (req, res) {
        setTimeout(function () {
            console.log('get debin preauth status type');
            res.send(data.debin_status_types);
        }, 500);
    });

    app.get('/debin/preauth', function (req, res) {
        setTimeout(function () {
            console.log('get debin preauth received');
            res.send(data.debin_preauth_received);
        }, 500);
    });

    app.post('/debin/preauth', function (req, res) {
        setTimeout(function () {
            console.log('post preauth');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.post('/debin/preauth/:preauthId/_discard', function (req, res) {
        setTimeout(function () {
            console.log('post debin preauth discard');
            res.send(data.debin_post_preauth_response);
        }, 500);
    })

    app.post('/debin/preauth/:preauthId/_cancel', function (req, res) {
        setTimeout(function () {
            console.log('post debin preauth cancel');
            res.send(data.debin_post_preauth_response);
        }, 500);
    })

    app.post('/debin/preauth/:preauthId/_confirm', function (req, res) {
        setTimeout(function () {
            console.log('post debin preauth confirm');
            res.send(data.debin_post_preauth_response);
        }, 500);
    })

    app.post('/debin/preauth/:preauthId/_doAction', function (req, res) {
        setTimeout(function () {
            console.log('post debin preauth doAction');
            res.send(data.debin_post_preauth_response);
        }, 500);
    })

    app.get('/debin/consumptions', function (req, res) {
        setTimeout(function () {
            console.log('get consumptions');
            res.send(data.debin_consumptions);
        }, 500);
    });


    app.delete('/debin/linkedAccounts', function (req, res) {
        setTimeout(function () {
            console.log('get linked accounts');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.get('/debin/payments/counter', function (req, res) {
        setTimeout(function () {
            console.log('get debin count');
            res.send(data.debin_count);
        }, 500);
    });

    app.get('/debin/payments', function (req, res) {
        setTimeout(function () {
            console.log('get pending debins ' + req.query.role);
            var role = req.query.role;
            if (role === "seller") {
                res.send(data.debin_pending_sent);
            } else {
                res.send(data.debin_pending_received);
            }
        }, 500);
    });

    app.get('/debin/payments/:debinId', function (req, res) {
        setTimeout(function () {
            console.log('get debin detail');
            res.send(data.debin_detail);
        }, 500);
    });

    app.get('/debin/dataCatalogs/conceptTypes', function (req, res) {
        setTimeout(function () {
            console.log('get concept tipes');
            res.send(data.debin_concept_types);
        }, 500);
    });

    app.get('/debin/dataCatalogs/preauth/periodOptions', function (req, res) {
        setTimeout(function () {
            console.log('get period Options');
            res.send(data.debin_period_options);
        }, 500);
    });

    app.get('/debin/dataCatalogs/expirationTimeOptions', function (req, res) {
        setTimeout(function () {
            console.log('get expiration time options');
            res.send(data.debin_expiration_times);
        }, 500);
    });

    app.post('/debin/payments/:debinId/_confirm', function (req, res) {
        setTimeout(function () {
            console.log('params - confirm Debin simulate ' + req.params.simulate);
            console.log('query - confirm Debin simulate ' + req.query.simulate);
            //var simulate = req.params.simulate ;
            //if (simulate) {
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                },
                "data": {
                    "isSignatureRequired": true
                }
            });
            //}else{
            //    res.send({ "result": { "code": "200", "info": "OK" } });
            //}
        }, 500);
    })

    app.post('/debin/payments/:debinId/_discard', function (req, res) {
        setTimeout(function () {
            console.log('discard Debin');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    })

    app.post('/debin/payments/:debinId/_cancel', function (req, res) {
        setTimeout(function () {
            console.log('cancel Debin');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    })
    
}