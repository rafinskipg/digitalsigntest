'use strict';

angular.module('digitalsignApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.generateKey = function(){

      $http.get('/api/getkey/'+$scope.forkey).success(function(data) {
        $scope.keygenerated = data;
      });
    }
    
    function encrypt(){
      $scope.undecrypted = $scope.cardnumber + '-'+$scope.cvc+'-'+$scope.date;
      // encrypt data with a public key (defaults to RSAES PKCS#1 v1.5)
      var pki = forge.pki;

      // convert a PEM-formatted public key to a Forge public key
      var publicKey = pki.publicKeyFromPem($scope.keygenerated.key);
      $scope.encrypted = publicKey.encrypt($scope.undecrypted);
    }
    $scope.decrypt = function() {
      encrypt();
      $http.post('/api/decrypt', {
        data: $scope.encrypted
      }).then(function(response){
        $scope.decryptgenerated = response.data;
      });
    }
  });
