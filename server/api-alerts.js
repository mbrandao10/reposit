const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");

var data = {

    alerts_alerts: JSON.parse(fs.readFileSync(ACM_folder + '/notifications/events-collection.json', 'utf8')),
    alerts_alert: JSON.parse(fs.readFileSync(ACM_folder + '/notifications/events-item.json', 'utf8')),
    alerts_subscriptions: JSON.parse(fs.readFileSync(ACM_folder + '/notifications/subscriptions-all-active.json', 'utf8')),
    periods: JSON.parse(fs.readFileSync(ACM_folder + '/notifications/dataCatalog/periods.json', 'utf8')),


}

module.exports = function (app, common) {

    app.get('/notifications/events', function (req, res) {
        setTimeout(function () {
            console.log('getting alerts');
            res.send(data.alerts_alerts);
        }, 500);
    });

    app.get('/notifications/events/:eventId', function (req, res) {
        setTimeout(function () {
            console.log('getting alert');
            res.send(data.alerts_alert);
        }, 500);
    });

    app.get('/notifications/dataCatalogs/periods', function (req, res) {
        setTimeout(function () {
            console.log('getting periods');
            res.send(data.periods);
        }, 500);
    });

    app.get('/notifications/suscriptions', function (req, res) {
        setTimeout(function () {
            console.log('getting suscriptions');
            res.send(data.alerts_subscriptions);
        }, 500);
    });

    app.put('/notifications/suscriptions', function (req, res) {
        setTimeout(function () {
            console.log('put suscriptions');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.post('/notifications/suscriptions', function (req, res) {
        setTimeout(function () {
            console.log('post suscriptions');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.delete('/notifications/suscriptions', function (req, res) {
        setTimeout(function () {
            console.log('delete suscriptions');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });
    
}