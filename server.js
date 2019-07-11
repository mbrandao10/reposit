var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var cors = require('cors');
var fs = require('fs');

var app = express();
var application_root = __dirname;
app.use(bodyParser.json())
app.use(cors());

var RAML_folder = path.resolve(__dirname, "./raml");

var data = {
    error400Signature: JSON.parse(fs.readFileSync(RAML_folder + '/common/errors/400-signature-required.json', 'utf8')),
    error500: JSON.parse(fs.readFileSync(RAML_folder + '/common/errors/400.json', 'utf8')),
    error403: JSON.parse(fs.readFileSync(RAML_folder + '/common/errors/403.json', 'utf8')),
    error400: JSON.parse(fs.readFileSync(RAML_folder + '/common/errors/500.json', 'utf8')),
    success200: JSON.parse(fs.readFileSync(RAML_folder + '/common/success/200.json', 'utf8')),
    error400SignatureOtp:JSON.parse(fs.readFileSync(RAML_folder + '/common/errors/400-signature-otp.json', 'utf8'))
}

require('./server/routes.js')(app, data);
//ITECBAN
require('./server/api-accounts.js')(app, data);
require('./server/api-alerts.js')(app, data);
require('./server/api-cards.js')(app, data);
require('./server/api-customers.js')(app, data);
require('./server/api-credits.js')(app, data);
require('./server/api-debin.js')(app, data);
require('./server/api-deposits.js')(app, data);
require('./server/api-direct-debits.js')(app, data);
require('./server/api-documentbox.js')(app, data);
require('./server/api-documents.js')(app, data);
require('./server/api-equities.js')(app, data);
require('./server/api-funds.js')(app, data);
require('./server/api-linkpayments.js')(app, data);
require('./server/api-loans.js')(app, data);
require('./server/api-mailbox.js')(app, data);
require('./server/api-signatures.js')(app, data);
require('./server/api-transfers.js')(app, data);
require('./server/api-cash-pooling.js')(app, data);
//ONESAIT
require('./server/api-confirming.js')(app, data);
require('./server/api-factoring.js')(app, data);
require('./server/api-leasing.js')(app, data);
require('./server/api-taxes.js')(app, data);
require('./server/api-sepa.js')(app, data);
require('./server/api-checks.js')(app, data);
require('./server/api-consents.js')(app, data);
require('./server/api-express-bill.js')(app, data);


var server = app.listen(3000, function() {
    console.log('Listening on port', server.address());
    console.log('application_root: ' + application_root);
});