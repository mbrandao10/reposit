const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");

var data = {

    taxes_consult_aeat: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/aeat-taxes-example-collection.json', 'utf8')),
    taxes_consult_tgss: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/tgss-taxes-example-collection.json', 'utf8')),
    taxes_types_aeat: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/dataCatalog/tax-payment-types-aeat.json', 'utf8')),
    taxes_types_tgss: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/dataCatalog/tax-payment-types-tgss.json', 'utf8')),
    taxes_forms_aeat_iva: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/dataCatalog/tax-forms-aeat-iva.json', 'utf8')),
    taxes_forms_aeat_ntf: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/dataCatalog/tax-forms-aeat-ntf.json', 'utf8')),
    taxes_forms_aeat_oth: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/dataCatalog/tax-forms-aeat-oth.json', 'utf8')),
    taxes_forms_aeat_ren: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/dataCatalog/tax-forms-aeat-ren.json', 'utf8')),
    taxes_forms_aeat_soc: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/dataCatalog/tax-forms-aeat-soc.json', 'utf8')),
    taxes_forms_tgss_tss: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/dataCatalog/tax-forms-tgss-tss.json', 'utf8')),
    taxes_years: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/dataCatalog/tax-years.json', 'utf8')),
    taxes_periods_months: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/dataCatalog/tax-periods-months.json', 'utf8')),
    taxes_periods_quarters: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/dataCatalog/tax-periods-quarters.json', 'utf8')),
    taxes_issuer_entities_aeat: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/dataCatalog/issuer-entities-aeat.json', 'utf8')),
    taxes_issuer_entities_tgss_tss: JSON.parse(fs.readFileSync(RAML_folder + '/taxes/taxes/dataCatalog/issuer-entities-tgss-tss.json', 'utf8')),

}

module.exports = function (app, common) {

    app.get('/api-taxes/taxes/:organism', function (req, res) {
        console.log('get consult taxes' + req.query.organism);
        res.send(data.taxes_consult_aeat);
        //res.send(data.taxes_consult_tgss);
    });

    app.get('/api-taxes/taxes/:organism/dataCatalogs/taxPaymentTypes', function (req, res) {
        console.log('get payments types taxes ' + req.params.organism);
        if (req.params.organism === "aeat"){
            res.send(data.taxes_types_aeat);
        }else if(req.params.organism === "tgss") {
            res.send(data.taxes_types_tgss);
        }
    });

    app.get('/api-taxes/taxes/:organism/dataCatalogs/:taxPaymentType/taxForms', function (req, res) {
        console.log('get payments forms taxes' + req.params.organism + '/' + req.params.taxPaymentType);
        switch (req.params.taxPaymentType) {
            case "IVA":
            res.send(data.taxes_forms_aeat_iva);
                break;
            case "NTF":
            res.send(data.taxes_forms_aeat_ntf);
                break;
            case "OTH":
                res.send(data.taxes_forms_aeat_oth);
                break;
            case "REN":
                res.send(data.taxes_forms_aeat_ren);
                break;
            case "SOC":
                res.send(data.taxes_forms_aeat_soc);
                break;
            case "TSS":
                res.send(data.taxes_forms_tgss_tss);
                break;
        }
    });

    app.get('/api-taxes/taxes/:organism/dataCatalogs/taxYears', function (req, res) {
        console.log('get tax years');
        res.send(data.taxes_years);
    });

    app.get('/api-taxes/taxes/:organism/dataCatalogs/:taxPaymentType/taxPeriods', function (req, res) {
        console.log('get tax periods');
        res.send(data.taxes_periods_months);
        //res.send(data.taxes_periods_quarters);
    });

    app.get('/api-taxes/taxes/:organism/dataCatalogs/:taxPaymentType/issuerEntities', function (req, res) {
        console.log('get issuer entities forms taxes ' + req.params.organism + '/' + req.params.taxPaymentType);
        if (req.params.organism === "aeat"){
            res.send(data.taxes_issuer_entities_aeat);
        }else if(req.params.organism === "tgss") {
            res.send(data.taxes_issuer_entities_tgss_tss);
        }
    });

    app.post('/api-taxes/taxes/tgss', function (req, res) {
        console.log('post payments types taxes ' + req.query.organism);
        if (!req.headers['x-signature-transaction']) {
            res.status(400).send(common.error400Signature);
        }
        else {
            res.send(common.success200);
        }
    });

    app.post('/api-taxes/taxes/aeat', function (req, res) {
        console.log('post payments types taxes');
        if (!req.headers['x-signature-transaction']) {
            res.status(400).send(common.error400Signature);
        }
        else {
            res.send(common.success200);
        }
    });
}