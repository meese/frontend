'use strict';

angular.module('directives').directive('addressSelect', function($api, $window, $modal) {

  return {
    restrict: 'EAC',
    templateUrl: 'common/directives/addressSelect/templates/addressSelect.html',
    scope: {
      model: '='
    },
    link: function(scope, element, attrs) {

      // Make the select a requr
      scope.required = Object.keys(attrs).indexOf('required') >= 0;

      $api.v2.addresses().then(function(response) {
        scope.addresses = angular.copy(response.data);
        scope.model = scope.addresses[0];
      });

      scope.newAddress = function() {
        $modal.open({
          templateUrl: 'common/directives/addressSelect/templates/newAddressModal.html',
          controller: function($scope, $modalInstance, countries, usStates) {
            $scope.countries = countries;
            $scope.usStates = usStates;

            // Reference addresses and model from parent scope
            $scope.addresses = scope.addresses;

            $scope.address = {
              name: undefined,
              address1: undefined,
              address2: undefined,
              address3: undefined,
              city: undefined,
              state: undefined,
              postal_code: undefined,
              country: undefined
            };

            $scope.close = function() {
              $modalInstance.close();
            };

            $scope.createAddress = function() {
              var payload = angular.copy($scope.address);

              $api.v2.createAddress(payload).then(function(response) {
                $scope.addresses.unshift(angular.copy(response.data));
                scope.model = $scope.addresses[0];

                $scope.close();
              });
            };
          }
        });
      };

      scope.manageAddresses = function() {
        $modal.open({
          templateUrl: 'common/directives/addressSelect/templates/manageAddressesModal.html',
          controller: function($scope, $modalInstance, countries, usStates) {

            $scope.countries = countries;
            $scope.usStates = usStates;

            // Reference addresses from parent scope
            $scope.addresses = scope.addresses;

            $scope.close = function() {
              $modalInstance.close();
            };

            $scope.enableEdit = function(index) {
              $scope.addresses[index]._changes = angular.copy($scope.addresses[index]);
            };

            $scope.cancelEdit = function(index) {
              delete $scope.addresses[index]._changes;
            };

            $scope.delete = function(index) {
              if ($window.confirm("Are you sure?")) {
                $api.v2.deleteAddress($scope.addresses[index].id).then(function() {
                  delete $scope.addresses[index]._changes;
                  $scope.addresses.splice(index,1);
                });
              }
            };

            $scope.saveChanges = function(index) {
              if ($scope.addresses[index]) {
                var payload = angular.copy($scope.addresses[index]._changes);

                $api.v2.updateAddress($scope.addresses[index].id, payload).then(function(response) {
                  console.log(response);

                  $scope.addresses[index] = angular.copy(response.data);
                });
              }
            };
          }
        });
      };

    }
  };

});