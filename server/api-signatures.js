const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");

var data = {

    persons_pending_detail: JSON.parse(fs.readFileSync(ACM_folder + '/signatures/coparticipant-detail.json', 'utf8')),
    persons_pending_signatures_user: JSON.parse(fs.readFileSync(ACM_folder + '/signatures/user-pendingOperations.json', 'utf8')),
    persons_pending_signatures_third_party: JSON.parse(fs.readFileSync(ACM_folder + '/signatures/thirdParty-pendingOperations.json', 'utf8')),
    persons_pending_signature_accept_input: JSON.parse(fs.readFileSync(ACM_folder + '/signatures/signature-accept-input.json', 'utf8')),
    persons_pending_counter: JSON.parse(fs.readFileSync(ACM_folder + '/signatures/signatures-counter-example.json', 'utf8')),
    persons_pending_signature_reject_input: JSON.parse(fs.readFileSync(ACM_folder + '/signatures/signature-reject-input.json', 'utf8')),
    persons_pending_signatures_signer_status_types: JSON.parse(fs.readFileSync(ACM_folder + '/signatures/dataCatalog/signer-status-types.json', 'utf8')),
    persons_pending_signatures_operation_status_types: JSON.parse(fs.readFileSync(ACM_folder + '/signatures/dataCatalog/operation-status-types.json', 'utf8')),
    persons_pending_signatures_operation_group_types: JSON.parse(fs.readFileSync(ACM_folder + '/signatures/dataCatalog/operation-group-types.json', 'utf8')),

}

module.exports = function(app, common) {

    app.get('/api-signatures/signatures/pendingOperations', function(req, res) {
        setTimeout(function() {
            console.log('Getting pending operations ', +req.query.recipient);
            if (req.query.recipient === "thirdparty") {
                res.send(data.persons_pending_signatures_third_party);
            } else {
                res.send(data.persons_pending_signatures_user);
            }
        }, 500);
    })

    app.get('/api-signatures/signatures/pendingOperations/counter', function(req, res) {
        setTimeout(function() {
            console.log('Getting signature counter');
            res.send(data.persons_pending_counter);
        }, 500);
    })

    app.get('/api-signatures/signatures/pendingOperations/:operationId', function(req, res) {
        setTimeout(function() {
            console.log('Getting signature detail');
            res.send(data.persons_pending_detail);
        }, 500);
    })

    app.put('/api-signatures/signatures/pendingOperations/:operationId', function(req, res) {
        setTimeout(function() {
            console.log('Executing pending operation action');
            // if (!req.headers['x-signature-transaction'])
            //     res.status(400).send(common.error400Signature);
            // else {
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
            // }
        }, 500);
    })

    app.get('/signatures/dataCatalogs/signerStatusTypes', function(req, res) {
        setTimeout(function() {
            console.log('Executing signer status types action');
            res.send(data.persons_pending_signatures_signer_status_types);
        }, 500);
    })

    app.get('/api-signatures/signatures/dataCatalogs/operationStatusTypes', function(req, res) {
        setTimeout(function() {
            console.log('Executing operation status types action');
            res.send(data.persons_pending_signatures_operation_status_types);
        }, 500);
    })

    app.get('/api-signatures/signatures/dataCatalogs/operationGroupTypes', function(req, res) {
        setTimeout(function() {
            console.log('Executing pending operation action');
            res.send(data.persons_pending_signatures_operation_group_types);
        }, 500);
    })

}