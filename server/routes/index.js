/*jslint node: true */
var rsa = require('./rsa');

'use strict';
exports.getKey = function(req, res) {
  var key = rsa.generateKey();
  res.json({ key: key });
};

exports.decrypt = function(req,res) {
  var undecrypted = req.body.data;
  var decrypted = rsa.decrypt(undecrypted);
  res.json({
    undecrypted: undecrypted,
    decrypted : decrypted
  });
};