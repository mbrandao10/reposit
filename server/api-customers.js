const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");

var data = {

    globalPosition: JSON.parse(fs.readFileSync(RAML_folder + '/customers/customers/customer-globalposition-example.json', 'utf8')),

    persons_bond_types: JSON.parse(fs.readFileSync(ACM_folder + '/customers/dataCatalog/bond-types.json', 'utf8')),
    persons_economic_regimens_types: JSON.parse(fs.readFileSync(ACM_folder + '/customers/dataCatalog/economic-regimens.json', 'utf8')),
    persons_phone_prefixes: JSON.parse(fs.readFileSync(ACM_folder + '/customers/dataCatalog/phone-number-prefix.json', 'utf8')),
    persons_address_types: JSON.parse(fs.readFileSync(ACM_folder + '/customers/dataCatalog/address-types.json', 'utf8')),
    persons_genders_types: JSON.parse(fs.readFileSync(ACM_folder + '/customers/dataCatalog/genders.json', 'utf8')),
    persons_marital_status_types: JSON.parse(fs.readFileSync(ACM_folder + '/customers/dataCatalog/maritalStatus.json', 'utf8')),
    persons_street_types: JSON.parse(fs.readFileSync(ACM_folder + '/customers/dataCatalog/street-types.json', 'utf8')),
    persons_provinces: JSON.parse(fs.readFileSync(ACM_folder + '/customers/dataCatalog/states-ARG.json', 'utf8')),
    persons_cities: JSON.parse(fs.readFileSync(ACM_folder + '/customers/dataCatalog/cities-ARG-BSA.json', 'utf8')),
    persons_personal_data: JSON.parse(fs.readFileSync(ACM_folder + '/customers/customer-personalData-example.json', 'utf8')),
    persons_address_personal_data: JSON.parse(fs.readFileSync(ACM_folder + '/customers/customer-contactAddresses-example.json', 'utf8')),
    persons_fiscal_relation_types: JSON.parse(fs.readFileSync(ACM_folder + '/customers/dataCatalog/fiscalRelationTypes.json', 'utf8')),
    // persons_account_invitations: JSON.parse(fs.readFileSync(ACM_folder + '/customers/customer-account-invitations.json', 'utf8')),
    products: JSON.parse(fs.readFileSync(RAML_folder + '/customers/customers/customer-product-collection-example.json', 'utf8')),
    persons_fiscal_summary: JSON.parse(fs.readFileSync(RAML_folder + '/customers/customers/products-fiscal-summary.json', 'utf8')),
    externalSignOut: JSON.parse(fs.readFileSync(RAML_folder + '/customers/customers/customer-externalSignOut-example.json', 'utf8')),

}

module.exports = function(app, common) {

    app.get('/api-customers/customers/position', function(req, res) {
        setTimeout(function() {
            console.log('globalPosition');
            res.send(data.globalPosition);
            // res.status(400).send(common.error500);
        }, 500);
    });

    app.get('/api-customers/customers/products', function(req, res) {
        setTimeout(function() {
            console.log('products');
            res.send(data.products);
            // res.status(400).send(data.error400);
        }, 500);
    });


    app.get('/api-customers/customers/:id/position', function(req, res) {
        setTimeout(function() {
            console.log('globalPosition');
            res.send(data.globalPosition);
        }, 500);
    });

    app.get('/api-customers/customers/dataCatalogs/addressTypes', function(req, res) {
        setTimeout(function() {
            console.log('getting address Types');
            res.send(data.persons_address_types);
        }, 500);
    });

    app.get('/api-customers/customers/dataCatalogs/genders', function(req, res) {
        setTimeout(function() {
            console.log('getting genders Types');
            res.send(data.persons_genders_types);
        }, 500);
    });

    app.get('/api-customers/customers/dataCatalogs/maritalStatus', function(req, res) {
        setTimeout(function() {
            console.log('getting marital status Types');
            res.send(data.persons_marital_status_types);
        }, 500);
    });

    app.get('/api-customers/customers/dataCatalogs/streetTypes', function(req, res) {
        setTimeout(function() {
            console.log('getting street Types');
            res.send(data.persons_street_types);
        }, 500);
    });

    app.get('/api-customers/customers/dataCatalogs/states', function(req, res) {
        setTimeout(function() {
            console.log('getting provinces');
            res.send(data.persons_provinces);
        }, 500);
    });

    app.get('/api-customers/customers/dataCatalogs/cities', function(req, res) {
        setTimeout(function() {
            console.log('getting cities');
            res.send(data.persons_cities);
        }, 500);
    });

    app.get('/api-customers/customers/dataCatalogs/fiscalRelationTypes', function(req, res) {
        setTimeout(function() {
            console.log('fiscal relation type');
            res.send(data.persons_fiscal_relation_types);
        }, 500);
    })

    app.get('/api-customers/customers/dataCatalogs/fiscalRelationTypes', function(req, res) {
        setTimeout(function() {
            console.log('fiscal relation type');
            res.send(data.persons_fiscal_relation_types);
        }, 500);
    })

    app.get('/api-customers/customers/dataCatalogs/bondType', function(req, res) {
        setTimeout(function() {
            console.log('person bond types');
            res.send(data.persons_bond_types);
        }, 500);
    })

    app.get('/api-customers/customers/dataCatalogs/economicRegime', function(req, res) {
        setTimeout(function() {
            console.log('person economic regime types');
            res.send(data.persons_economic_regimens_types);
        }, 500);
    })

    app.get('/api-customers/customers/dataCatalogs/phoneNumberPrefixes', function(req, res) {
        setTimeout(function() {
            console.log('person phone number prefixes');
            res.send(data.persons_phone_prefixes);
        }, 500);
    })

    app.get('/api-customers/customers/', function(req, res) {
        setTimeout(function() {
            console.log('Personal data');
            res.send(data.persons_personal_data);
        }, 500);
    })

    app.put('/api-customers/customers/:userNumber', function(req, res) {
        setTimeout(function() {
            console.log('Put Personal data');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    })

    app.get('/api-customers/customers/addresses', function(req, res) {
        setTimeout(function() {
            console.log('Address Personal data');
            res.send(data.persons_address_personal_data);
        }, 500);
    })

    app.put('/api-customers/customers/addresses/:addressId', function(req, res) {
        setTimeout(function() {
            console.log('Put Personal Address data');
            res.send({
                "result": {
                    "code": "200",
                    "info": "OK"
                }
            });
        }, 500);
    })

    app.get('/api-customers/customers/reports/annualFiscalSummary', function(req, res) {
        setTimeout(function() {
            console.log('Get Fiscal Summary');
            res.send(data.persons_fiscal_summary);
        }, 500);
    })

    app.get('/api-customers/customers/_externalSignIn', function(req, res) {
        setTimeout(function() {
            console.log('externalSignOut');
            res.send(data.externalSignOut);
        }, 2500);
    })
}