/*jslint node: true */
'use strict';
var express = require('express'),
    routes = require('./routes'),
    app = express();

app.use(express.bodyParser());

app.get('/api/getkey/:uniqueid', routes.getKey);
app.post('/api/decrypt', routes.decrypt);

app.use(function (req, res) {
    res.json({'ok': false, 'status': '404'});
});

module.exports = app;