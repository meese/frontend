'use strict';

angular.module('activity').
  controller('NewCashOutController', function($scope, $api, $window, $location, countries, usStates) {

    $scope.countries = countries;
    $scope.usStates = usStates;

    $scope.cashOut = {
      type: undefined,
      amount: undefined,
      address: undefined,
      paypal_address: undefined,
      bitcoin_address: undefined,
      mailing_address: undefined
    };

    // Set default to amount to current account balance
    $scope.$watch('current_person', function(person) {
      if (person) {
        $scope.cashOut.amount = parseFloat(person.account.balance);
      }
    });

    $scope.showNewAddressForm = function() {
      $scope._showNewAddressForm = true;
    };

    $scope.hideNewAddressForm = function() {
      $scope._showNewAddressForm = false;
    };

    $scope.createNewAddress = function() {
      var payload = angular.copy($scope.newAddress);

      $api.v2.createAddress(payload).then(function(response) {
        // Push addresses into array
        $scope.addresses.push(angular.copy(response.data));

        // Set selected address to the newly created one
        $scope.cashOut.address = $scope.addresses[$scope.addresses.length - 1];

        $scope.hideNewAddressForm();
      });
    };

    $scope.destroySelectedAddress = function() {
      if ($window.confirm("Are you sure?")) {
        $api.v2.destroyAddress($scope.cashOut.address.id).then(function() {
          for (var i=0; i<$scope.addresses.length; i++) {
            if ($scope.addresses[i].id === $scope.cashOut.address.id) {
              $scope.addresses.splice(i,1);
              $scope.cashOut.address = undefined;
              break;
            }
          }
        });
      }
    };

    $scope.createCashOut = function() {
      var payload = {
        type: $scope.cashOut.type,
        amount: $scope.cashOut.amount,
        address_id: $scope.cashOut.address && $scope.cashOut.address.id,
        mailing_address_id: $scope.cashOut.mailing_address && $scope.cashOut.mailing_address.id,
        paypal_address: $scope.cashOut.paypal_address,
        bitcoin_address: $scope.cashOut.bitcoin_address
      };

      $api.v2.createCashOut(payload).then(function(response) {
        if (response.success) {
          $location.url('/activity/transactions/cash_outs');
        } else {
          $scope.alert = {
            type: 'danger',
            message: response.data.error
          };
        }
      });
    };

  });