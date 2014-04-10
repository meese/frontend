'use strict';

angular.module('app').
  config(function($routeProvider, defaultRouteOptions, personResolver) {
    $routeProvider.when('/activity/cash_outs', angular.extend({
      templateUrl: '/app/activity/cash_outs.html',
      controller: 'CashOutsIndexController',
      title: 'New Cash Out',
      trackEvent: 'View Cash Out',
      resolve: { person: personResolver }
    }, defaultRouteOptions));
  }).

  controller('CashOutsIndexController', function($scope, $api) {

    $api.v2.cashOuts().then(function(response) {
      console.log(response);

      $scope.cashOuts = angular.copy(response.data);
    });

  });