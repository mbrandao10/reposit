const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");

var data = {    
   
    documentbox_documents: JSON.parse(fs.readFileSync(ACM_folder + '/documentBox/documentbox-example-collection.json', 'utf8')),
    documentbox_documents_categories: JSON.parse(fs.readFileSync(ACM_folder + '/documentBox/documentbox-document-categories.json', 'utf8')),
    documentbox_documents_types: JSON.parse(fs.readFileSync(ACM_folder + '/documentBox/documentbox-document-types.json', 'utf8')),
    documentbox_documents_counter: JSON.parse(fs.readFileSync(ACM_folder + '/documentBox/documentbox-counter-example.json', 'utf8')),

}

module.exports = function (app, common) {

    app.get('/documentBox/documents', function (req, res) {
        setTimeout(function () {
            console.log('/getting documents/');
            res.send(data.documentbox_documents);
        }, 500);
    });

    app.get('/documentBox/documents/categories', function (req, res) {
        setTimeout(function () {
            console.log('getting documents categories');
            res.send(data.documentbox_documents_categories);
        }, 500);
    });

    app.get('/documentBox/documents/categories/:id/types', function (req, res) {
        setTimeout(function () {
            console.log('getting documents types for category ' + req.params.id);
            res.send(data.documentbox_documents_types);
        }, 500);
    });

    app.get('/documentBox/documents/counter', function (req, res) {
        setTimeout(function () {
            console.log('getting documents counter ');
            res.send(data.documentbox_documents_counter);
        }, 500);
    });
    
}