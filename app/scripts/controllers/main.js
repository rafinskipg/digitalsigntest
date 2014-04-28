'use strict';

angular.module('digitalsignApp')
  .controller('MainCtrl', function ($scope, $http) {
    //Gets the public key ciphered
    $scope.generateKey = function(){
      $http.get('/api/getkey').success(function(data) {
        $scope.keygenerated = data.key;
        // encrypt data with a public key (defaults to RSAES PKCS#1 v1.5)
        var pki = forge.pki;
        // convert a PEM-formatted public key to a Forge public key
        $scope.publicKey = pki.publicKeyFromPem($scope.keygenerated);
      });
    }
    
    //Encrypts the form with the public key
    function encrypt(){
      $scope.undecrypted = $scope.cardnumber + '-'+$scope.cvc+'-'+$scope.date;
      $scope.encrypted = $scope.publicKey.encrypt($scope.undecrypted);
    }

    //Calls the server with the encrypted data and expects the result decrypted
    $scope.decrypt = function() {
      encrypt();
      $http.post('/api/decrypt', {
        data: $scope.encrypted
      }).then(function(response){
        $scope.decryptgenerated = response.data;
      });
    }

    //Try to decrypt at client side, it shouldn't be possible
    $scope.hack = function(){
      var publicKey = forge.pki.publicKeyFromPem($scope.keygenerated.key)
      $scope.hacked = publicKey.decrypt($scope.encrypted);
    }
  });
