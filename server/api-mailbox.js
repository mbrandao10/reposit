const path = require("path");
var fs = require('fs');

var RAML_folder = path.resolve(__dirname, "../raml");
var ACM_folder = path.resolve(__dirname, "../mocks");

var data = {

    mailbox_conversations: JSON.parse(fs.readFileSync(ACM_folder + '/mailbox/conversation-example-collection.json', 'utf8')),
    mailbox_conversation: JSON.parse(fs.readFileSync(ACM_folder + '/mailbox/conversation-messages-example-collection.json', 'utf8')),
    mailbox_conversation_multiple: JSON.parse(fs.readFileSync(ACM_folder + '/mailbox/conversation-multiple-messages-example-collection.json', 'utf8')),
    mailbox_conversation_counter: JSON.parse(fs.readFileSync(ACM_folder + '/mailbox/conversations-counter-example.json', 'utf8')),
    mailbox_conversation_types: JSON.parse(fs.readFileSync(ACM_folder + '/mailbox/mailbox-conversation-types.json', 'utf8')),

}

module.exports = function (app, common) {

    app.get('/mailBox/conversations', function (req, res) {
        setTimeout(function () {
            console.log('mailBox conversations ');
            //res.status(400).send(data.error400);
            res.send(data.mailbox_conversations);
        }, 500);
    });

    app.get('/mailBox/conversations/trash', function (req, res) {
        setTimeout(function () {
            console.log('mailBox conversations trash');
            res.send(data.mailbox_conversations);
        }, 500);
    });

    app.get('/mailBox/conversations/counter', function (req, res) {
        setTimeout(function () {
            console.log('mailBox conversation counter ');
            res.send(data.mailbox_conversation_counter);
        }, 500);
    });

    app.get('/mailBox/conversations/types', function (req, res) {
        setTimeout(function () {
            console.log('mailBox conversation types ');
            res.send(data.mailbox_conversation_types);
        }, 500);
    });

    app.post('/mailBox/conversations/:id', function (req, res) {
        setTimeout(function () {
            console.log('saving mailBox conversation respond' + req.params.id);
            var response = {
                result: {
                    code: 200,
                },
                data: data.mailbox_conversation_multiple.data.messages[1]
            }
            res.send(response);
        }, 500);
    });

    app.get('/mailBox/conversations/:id', function (req, res) {
        setTimeout(function () {
            console.log('mailBox conversation ' + req.params.id);
            var isMessage = false;
            data.mailbox_conversations.data.forEach(function (conversation) {
                if (conversation.id === req.params.id) {
                    isMessage = conversation.canReply;
                }
            })
            if (isMessage) {
                res.send(data.mailbox_conversation_multiple);
            } else {
                res.send(data.mailbox_conversation);
            }
        }, 500);
    });

    app.delete('/mailBox/conversations', function (req, res) {
        setTimeout(function () {
            console.log('delete mailBox conversation ' + req.query.ids);
            res.send('{"result": {"code": "200","info": "OK"}}');
        }, 500);
    });

    app.post('/mailBox/conversations', function (req, res) {
        setTimeout(function () {
            console.log('saving mailBox conversation');
            res.send(data.mailbox_conversations);
        }, 500);
    });
    
}