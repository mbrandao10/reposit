const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");

var data = {

}

module.exports = function (app, common) {


    app.get('/documents/:id', function (req, res) {
        setTimeout(function () {
            console.log('getting document ' + req.params.id);
            console.log('download ' + req.get("force-download"));
            var fileRoute = ACM_folder + '/accounts/movements/documents/32190479.pdf';
            var random = Math.floor((Math.random() * 10) + 1);
            if (random % 2 === 0) {
                fileRoute = ACM_folder + '/documents/sample.pdf';
            }
            var file = fs.createReadStream(fileRoute);
            var stat = fs.statSync(fileRoute);
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            //res.setHeader('Content-Type', 'binary/octet-stream');
            //res.setHeader('Content-Disposition', 'attachment; filename=prueba.pdf');
            //res.setHeader('Content-Transfer-Encoding', 'binary');
            //res.setHeader('Content-Description', 'File Transfer');
            /*if(req.get("force-download")){
                console.log("downloading");
                res.setHeader('Content-Type', 'application/octet-stream');
                res.setHeader('Content-Disposition', 'attachment; filename=fileName.pdf');
            }*/
            file.pipe(res);
        }, 500);

    });

    app.get('/documents/:id/:name', function (req, res) {
        setTimeout(function () {
            console.log('getting document ' + req.params.id + " name: " + req.params.name);
            console.log('download ' + req.get("force-download"));
            var fileRoute = ACM_folder + '/accounts/movements/documents/32190479.pdf';
            var random = Math.floor((Math.random() * 10) + 1);
            if (random % 2 === 0) {
                fileRoute = ACM_folder + '/documents/sample.pdf';
            }
            var file = fs.createReadStream(fileRoute);
            var stat = fs.statSync(fileRoute);
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            file.pipe(res);
        }, 500);
    });
}