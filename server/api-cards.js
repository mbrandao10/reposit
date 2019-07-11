const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");

var data = {

    cards: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/cards-collection-example.json', 'utf8')),
    debitCard: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/debitCards-detail-example.json', 'utf8')),
    creditCard: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/creditCards-detail-example.json', 'utf8')),
    debitCards_limits: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/debitCards-limits.json', 'utf8')),
    creditCards_limits: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/creditCards-limits.json', 'utf8')),
    debitCard_update_limit: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/debitCards-updateLimit-input.json', 'utf8')),
    debitCard_movements: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/debitCarsMovements-collection.json', 'utf8')),
    debitCard_movement: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/debitCardsMovement-detail.json', 'utf8')),
    debitCard_linkable_linkable: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/debitCards-linkable-accounts.json', 'utf8')),
    debitCard_accounts_associates: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/debitCards-card-accounts.json', 'utf8')),
    debitCardAlias: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/alias-example.json', 'utf8')),
    creditCard_balance: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/credit-balance.json', 'utf8')),
    creditCard_limits: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/creditCards-limits.json', 'utf8')),
    creditCard_statements: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/creditCards-statements.json', 'utf8')),
    creditCard_statement: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/creditCards-statements-detail.json', 'utf8')),
    creditCard_pin: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/pin-info-example.json', 'utf8')),

    creditCard_payment_types: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/datacatalog/paymentType.json', 'utf8')),
    creditCard_settlement_groups: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/dataCatalog/settlementGroup.json', 'utf8')),
    creditCard_statementsStatusTypes: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/dataCatalog/statements-status.json', 'utf8')),
    card_Expenses: JSON.parse(fs.readFileSync(RAML_folder + '/cards/cards/spendings-report-example.json', 'utf8')),

    

    // cards: JSON.parse(fs.readFileSync(ACM_folder + '/cards/cards-example-collection.json', 'utf8')),
    // debitCard: JSON.parse(fs.readFileSync(ACM_folder + '/cards/debitCards-example-detail.json', 'utf8')),
    // debitCard_limits: JSON.parse(fs.readFileSync(ACM_folder + '/cards/debitCards-limits.json', 'utf8')),
    // debitCard_update_limit: JSON.parse(fs.readFileSync(ACM_folder + '/cards/debitCards-updateLimit-input.json', 'utf8')),
    // debitCard_movements: JSON.parse(fs.readFileSync(ACM_folder + '/cards/debitCarsMovements-collection.json', 'utf8')),
    // debitCard_movement: JSON.parse(fs.readFileSync(ACM_folder + '/cards/debitCardsMovement-detail.json', 'utf8')),
    // debitCard_linkable_linkable: JSON.parse(fs.readFileSync(ACM_folder + '/cards/debitCards-linkable-accounts.json', 'utf8')),
    // debitCard_accounts_associates: JSON.parse(fs.readFileSync(ACM_folder + '/cards/debitCards-card-accounts.json', 'utf8')),
    // debitCardAlias: JSON.parse(fs.readFileSync(ACM_folder + '/cards/alias-example.json', 'utf8')),
    // creditCard_balance: JSON.parse(fs.readFileSync(ACM_folder + '/cards/credit/balance.json', 'utf8')),
    // creditCard_limits: JSON.parse(fs.readFileSync(ACM_folder + '/cards/credit/creditCard-limits.json', 'utf8')),
    // creditCard_statements: JSON.parse(fs.readFileSync(ACM_folder + '/cards/credit/creditCard-statements.json', 'utf8')),

    // creditCard_payment_types: JSON.parse(fs.readFileSync(ACM_folder + '/cards/datacatalog/paymentType.json', 'utf8')),
    // creditCard_settlement_groups: JSON.parse(fs.readFileSync(ACM_folder + '/cards/dataCatalog/settlementGroup.json', 'utf8')),
    // creditCard_statementsStatusTypes: JSON.parse(fs.readFileSync(ACM_folder + '/cards/dataCatalog/statements-status.json', 'utf8')),
    // creditCard_pin: JSON.parse(fs.readFileSync(ACM_folder + '/cards/cards-pin-example.json', 'utf8')),


    // creditCard_available: JSON.parse(fs.readFileSync(ACM_folder + '/cards/credit/query-products-collection.json', 'utf8')),
    // debitCard_limits_values: JSON.parse(fs.readFileSync(ACM_folder + '/cards/standard-limit-values.json', 'utf8')),
}

module.exports = function(app, common) {

    app.get('/api-cards/cards', function(req, res) {
        setTimeout(function() {
            console.log('cards');
            res.send(data.cards);
        }, 500);
    });

    app.get('/api-cards/cards/products/credit', function(req, res) {
        setTimeout(function() {
            console.log('get creditcards availables');
            res.send(data.creditCard_available);
        }, 500);
    });

    app.get('/api-cards/cards/standardLimitValues', function(req, res) {
        setTimeout(function() {
            console.log('limits values');
            res.send(data.debitCard_limits_values);
        }, 500);
    });

    app.get('/api-cards/cards/linkableAccounts', function(req, res) {
        setTimeout(function() {
            console.log('debitCard linkable accounts');
            res.send(data.debitCard_linkable_linkable);
        }, 500);
    });

    app.get('/api-cards/cards/:cardId/pin', function(req, res) {
        setTimeout(function() {
            console.log('pin');
            res.send(data.creditCard_pin);
        }, 500);
    });

    app.get('/api-cards/cards/:cardId', function(req, res) {
        setTimeout(function() {
            console.log('debitCards');
            res.send(data.debitCard);
        }, 500);
    });

    app.delete('/api-cards/cards/:cardId', function(req, res) {
        setTimeout(function() {
            console.log('Delete debitcard' + req.query.params);
            res.send('{"result": {"code": "200","info": "OK"}}');
        }, 500);
    });

    app.put('/api-cards/cards/:cardId/alias', function(req, res) {
        setTimeout(function() {
            console.log('debitCard update alias');
            res.send(data.debitCardAlias);
        }, 500);
    });

    app.put('/api-cards/cards/:cardId/paymentType', function(req, res) {
        setTimeout(function() {
            console.log('creditCard update payment type');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.put('/api-cards/cards/:cardId/settlementGroup', function(req, res) {
        setTimeout(function() {
            console.log('creditCard update settlement group');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.get('/api-cards/cards/:cardId/alias', function(req, res) {
        setTimeout(function() {
            console.log('debitCard update alias');
            res.send(data.debitCardAlias);
        }, 500);
    });

    app.get('/api-cards/cards/:cardId/statements', function(req, res) {
        setTimeout(function() {
            console.log('get statements creditCard');
            res.send(data.creditCard_statements);
        }, 500);
    });

    app.get('/api-cards/cards/:cardId/statements/:movementId', function(req, res) {
        setTimeout(function() {
            console.log('debitCard statements detail');
            res.send(data.creditCard_statement);
        }, 500);
    });

    app.get('/api-cards/cards/:cardId/limits/debit', function(req, res) {
        setTimeout(function() {
            console.log('debitCard limits');
            res.send(data.debitCard_limits);
        }, 500);
    });

    app.get('/api-cards/cards/:cardId/limits/credit', function(req, res) {
        setTimeout(function() {
            console.log('get creditCard limits');
            res.send(data.creditCard_limits);
        }, 500);
    });

    app.put('/api-cards/cards/:cardId/limits', function(req, res) {
        setTimeout(function() {
            console.log('put limits');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.get('/api-cards/cards/:cardId/movements', function(req, res) {
        setTimeout(function() {
            console.log('debitCard movements');
            res.send(data.debitCard_movements);
        }, 500);
    });

    app.get('/api-cards/cards/:cardId/movements/:movementId', function(req, res) {
        setTimeout(function() {
            console.log('debitCard movement detail');
            res.send(data.debitCard_movement);
        }, 500);
    });

    app.post('/api-cards/cards/debitCard/_requestCreditCard', function(req, res) {
        setTimeout(function() {
            console.log('create debitCard');
            if (!req.headers['x-signature-transaction']) {
                res.status(400).send(common.error400Signature);
            } else {
                res.send({
                    "result": {
                        "code": "200",
                        "info": "OK"
                    }
                });
            }
        }, 500);
    });

    app.post('/api-cards/cards/creditCard/_requestCreditCard', function(req, res) {
        setTimeout(function() {
            console.log('create creditcard');
            if (!req.headers['x-signature-transaction']) {
                res.status(400).send(common.error400Signature);
            } else {
                res.send({
                    "result": {
                        "code": "200",
                        "info": "OK"
                    }
                });
            }
        }, 500);
    });

    app.post('/api-cards/cards/:cardId/_activate', function(req, res) {
        setTimeout(function() {
            console.log('activate debitcard');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.post('/api-cards/cards/:cardId/_makePayment', function(req, res) {
        setTimeout(function() {
            console.log('make creditcard payment');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.post('/api-cards/cards/:cardId/_duplicateRequest', function(req, res) {
        setTimeout(function() {
            console.log('duplicate debitcard');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.post('/api-cards/cards/:cardId/_lock', function(req, res) {
        setTimeout(function() {
            console.log('lock creditcard');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.get('/api-cards/cards/:cardId/accounts', function(req, res) {
        setTimeout(function() {
            console.log('debitCard accounts associates');
            res.send(data.debitCard_accounts_associates);
        }, 500);
    });

    app.put('/api-cards/cards/:cardId/accounts', function(req, res) {
        setTimeout(function() {
            console.log('debitCard put accounts associates');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    });

    app.get('/api-cards/cards/:cardId/balances', function(req, res) {
        setTimeout(function() {
            console.log('get creditCard balance');
            res.send(data.creditCard_balance);
        }, 500);
    });

    app.get('/api-cards/cards/dataCatalogs/paymentTypes', function(req, res) {
        setTimeout(function() {
            console.log('get payment types');
            res.send(data.creditCard_payment_types);
        }, 500);
    });

    app.get('/api-cards/cards/dataCatalogs/settlementGroups', function(req, res) {
        setTimeout(function() {
            console.log('get settlement groups');
            res.send(data.creditCard_settlement_groups);
        }, 500);
    });

    app.get('/api-cards/cards/dataCatalogs/statementsStatusTypes', function(req, res) {
        setTimeout(function() {
            console.log('get statements status types');
            res.send(data.creditCard_statementsStatusTypes);
        }, 500);
    });
    
    app.get('/api-cards/cards/cards/:cardId/reports/cashflow', function(req, res) {
        setTimeout(function() {
            console.log('get card expenses');
            res.send(data.card_Expenses);
        }, 500);
    });
}