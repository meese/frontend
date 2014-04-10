'use strict';

angular.module('app').
  config(function($routeProvider, defaultRouteOptions, personResolver) {
    $routeProvider.when('/cash_outs', angular.extend({
      templateUrl: '/app/cash_outs/index.html',
      controller: 'CashoutsIndexController',
      title: 'New Cash Out',
      trackEvent: 'View Cash Out',
      resolve: { person: personResolver }
    }, defaultRouteOptions));
  }).

  controller('CashoutsIndexController', function($scope, $api) {

    $api.v2.cashOuts().then(function(response) {
      console.log(response);

      $scope.cashOuts = angular.copy(response.data);
    });

  });