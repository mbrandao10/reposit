const path = require("path");
var fs = require('fs');

var ACM_folder = path.resolve(__dirname, "../mocks");
var RAML_folder = path.resolve(__dirname, "../raml");

var data = {
    //
    //**** accounts ****
    //

    accounts_checkbox_type: JSON.parse(fs.readFileSync(RAML_folder + '/accounts/accounts/dataCatalog/chequeBook-types.json', 'utf8')),
    accounts: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/account-example-collection.json', 'utf8')),
    accountsStatementRequests: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/201-statementRequest-success.json', 'utf8')),
    accountsStatement: JSON.parse(fs.readFileSync(RAML_folder + '/common/success/200.json', 'utf8')),
    accounts_products: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/account-available-products-example.json', 'utf8')),
    account_product: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/account-product-detail.json', 'utf8')),
    account: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/account-example.json', 'utf8')),
    account_incoming_and_spending: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/incomingAndSpending-report-example.json', 'utf8')),
    account_formats: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/dataCatalog/account-formats.json', 'utf8')),
    account_participationDispositionTypes: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/dataCatalog/participation-disposition-types.json', 'utf8')),
    accounts_interveners: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/201-newAccount-success.json', 'utf8')),
    movements: JSON.parse(fs.readFileSync(RAML_folder + '/accounts/accounts/movements-example-collection.json', 'utf8')),
    interveners: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/interveners-example-collection.json', 'utf8')),
    retentions: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/retention-collection-example.json', 'utf8')),
    locked: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/locks-collection-example.json', 'utf8')),
    accountCancelSimulation: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/account-cancel-simulation.json', 'utf8')),
    accountAlias: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/alias-example.json', 'utf8')),

    movement_sepa: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/movements/movement-transfer-example.json', 'utf8')),
    movement_international: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/movements/movement-international-transfer-example.json', 'utf8')),
    movement_adeudo: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/movements/movement-direct-debit-example.json', 'utf8')),
    movement_liquidacion: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/movements/movement-settlement-example.json', 'utf8')),
    movement_cargo: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/movements/movement-remittanceChargeTransfer-example.json', 'utf8')),
    movement_abono_adeudo: JSON.parse(fs.readFileSync(ACM_folder + '/accounts/movements/movement-remittanceDebsPaymentMovement-example.json', 'utf8')),

    settlements: JSON.parse(fs.readFileSync(RAML_folder + '/accounts/accounts/reports-settlement-example.json', 'utf8')),
    settlement_dates: JSON.parse(fs.readFileSync(RAML_folder + '/accounts/accounts/reports-settlement-dates.json', 'utf8')),
}

module.exports = function(app, common) {
    /////////////////////////////////////////////
    //////////////////ACCOUNTS///////////////////
    /////////////////////////////////////////////

    app.post('/api-accounts/accounts/:accountId/chequeBooks', function(req, res) {
        console.log('accounts checkBook');
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

    });

    app.get('/api-accounts/accounts/dataCatalogs/chequeBookTypes', function(req, res) {
        res.send(data.accounts_checkbox_type);
    });

    app.get('/api-accounts/accounts', function(req, res) {
        setTimeout(function() {
            console.log('accounts');
            res.send(data.accounts);
        }, 500);
    });

    app.post('/api-accounts/accounts/:id/statementRequests', function(req, res) {
        setTimeout(function() {
            console.log('statementRequests account' + req);
            res.send(data.accountsStatementRequests);
        }, 500);
    });

    app.post('/api-accounts/accounts/:accountId/reports/statements', function(req, res) {
        setTimeout(function() {
            console.log('statementRequests account' + req);
            res.send(data.accountsStatement);
        }, 500);
    });

    app.get('/api-accounts/accounts/products', function(req, res) {
        setTimeout(function() {
            console.log('accounts products');
            res.send(data.accounts_products);
        }, 500);
    });

    app.get('/api-accounts/accounts/products/:code', function(req, res) {
        setTimeout(function() {
            console.log('account product');
            res.send(data.account_product);
        }, 500);
    });

    app.post('/api-accounts/accounts', function(req, res) {
        setTimeout(function() {
            console.log('create account');
            if (!req.headers['x-signature-transaction'])
                res.status(400).send(common.error400Signature);
            else {
                res.send({
                    data: {
                        id: "1212121212"
                    }
                });
            }
        }, 500);
    });

    app.get('/api-accounts/accounts/:id', function(req, res) {
        setTimeout(function() {
            console.log('account ' + req.params.id);
            res.send(data.account);
        }, 500);
    });

    app.post('/api-accounts/accounts/:id/_cancel', function(req, res) {
        setTimeout(function() {
            console.log('deleting account ' + req.params.id);
            res.send(data.account);
        }, 500);
    });

    app.get('/api-accounts/accounts/:id/_simulationCancel', function(req, res) {
        setTimeout(function() {
            console.log('simulating cancel account ' + req.params.id);
            res.send(data.accountCancelSimulation);
        }, 500);
    });

    app.get('/api-accounts/accounts/:id/reports/incomeAndSpending', function(req, res) {
        setTimeout(function() {
            console.log('account accountIncomingAndSpending' + req.params.id);
            res.send(data.account_incoming_and_spending);
        }, 500);
    });

    app.get('/api-accounts/accounts/:id/movements/:movementId', function(req, res) {
        setTimeout(function() {
            console.log('account movement details ' + req.params.movementId);
            var movementType;
            data.movements.data.forEach(function(movement) {
                if (movement.id === req.params.movementId) {
                    movementType = movement.type.id;
                }
            })
            switch (movementType) {
                case "TRSR":
                case "TRSE":
                case "TRPE":
                case "TRPR":
                    res.send(data.movement_sepa);
                    break;
                case "TRIE":
                case "TRIR":
                    res.send(data.movement_international);
                    break;
                case "ADSR":
                case "ADNR":
                    res.send(data.movement_adeudo);
                    break;
                case "LIQ":
                case "LIQC":
                    res.send(data.movement_liquidacion);
                    break;
                case "RM34":
                    res.send(data.movement_cargo);
                    break;
                case "ARAD":
                    res.send(data.movement_abono_adeudo);
                    break;
            }
        }, 500);
    });

    app.get('/api-accounts/accounts/:id/movements', function(req, res) {
        setTimeout(function() {
            console.log('account movements ' + req.params.id);
            console.log('account movements ' + req.query.byDates);
            res.send(data.movements);
        }, 500);
    });

    app.get('/api-accounts/accounts/:id/interveners', function(req, res) {
        setTimeout(function() {
            console.log('account interveners ' + req.params.id);
            res.send(data.interveners);
        }, 500);
    });

    app.get('/api-accounts/accounts/:id/retentions', function(req, res) {
        setTimeout(function() {
            console.log('account retentions ' + req.params.id);
            res.send(data.retentions);
        }, 500);
    });

    app.get('/api-accounts/accounts/:id/locks', function(req, res) {
        setTimeout(function() {
            console.log('account locked ' + req.params.id);
            res.send(data.locked);
        }, 500);
    });

    app.put('/api-accounts/accounts/:id/alias', function(req, res) {
        setTimeout(function() {
            console.log('account update alias');
            var result = {
                "result": {
                    "code": "200",
                    "info": "OK"
                },
                "data": {
                    "alias": "Cuenta gastos domÃ©sticos"
                }
            }
            res.send(result);
        }, 500);
    });

    app.get('/api-accounts/accounts/:id/alias', function(req, res) {
        setTimeout(function() {
            console.log('account getting alias');
            res.send(data.accountAlias);
        }, 500);
    });

    app.get('/api-accounts/accounts/dataCatalog/accountFormats', function(req, res) {
        setTimeout(function() {
            console.log('account retentions ' + req.params.id);
            res.send(data.account_formats);
        }, 500);
    });

    app.get('/api-accounts/accounts/dataCatalog/participationDispositionTypes', function(req, res) {
        setTimeout(function() {
            console.log('participationDispositionTypes');
            res.send(data.account_participationDispositionTypes);
        }, 500);
    });

    app.post('/api-accounts/accounts/:id/interveners', function(req, res) {
        setTimeout(function() {
            console.log('interveners');
            res.send(data.accounts_interveners);
        }, 500);
    });

    app.get('/api-accounts/accounts/:accountId/reports/settlement', function(req, res) {
        console.log('get settlements');
        res.send(data.settlements);
    });

    app.get('/api-accounts/accounts/:accountId/reports/settlement/settlementDates', function(req, res) {
        console.log('get settlement dates');
        res.send(data.settlement_dates);
    });
}