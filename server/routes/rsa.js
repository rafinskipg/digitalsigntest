var forge = require('node-forge');
var keypair;

var generateRSAKey = function(){
  var rsa = forge.pki.rsa;
  // generate an RSA key pair synchronously
  keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
  // convert a Forge public key to PEM-format
  var pem = forge.pki.publicKeyToPem(keypair.publicKey);
  return pem;
}

var decryptWithPrivateKey = function(data){
  var decrypted = keypair.privateKey.decrypt(data);
  return decrypted;
}

module.exports = {
  generateKey : generateRSAKey,
  decrypt:decryptWithPrivateKey
};