var forge = require('node-forge');
var keypair;

var generatePkcs5Key = function(randomId){
  return forge.pkcs5.pbkdf2('password', randomId, 2, 16);
}
var generateRSAKey = function(randomId){
  var rsa = forge.pki.rsa;
  // generate an RSA key pair synchronously
  keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});

  // generate an RSA key pair asynchronously (uses web workers if available)
  rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
    // keypair.privateKey, keypair.publicKey
  });
  // convert a Forge public key to PEM-format
  var pem = forge.pki.publicKeyToPem(keypair.publicKey);
  return pem;
}
var decrypt = function(data){
  // decrypt data with a private key (defaults to RSAES PKCS#1 v1.5)
  var decrypted = keypair.privateKey.decrypt(data);
  return decrypted;
}

module.exports = {
  generateKey : generateRSAKey,
  decrypt:decrypt
};