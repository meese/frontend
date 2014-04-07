'use strict';

angular.module('app').
  config(function($routeProvider, defaultRouteOptions, personResolver) {

    $routeProvider.when('/cashout', angular.extend({
      templateUrl: 'app/cashout/new.html',
      controller: 'CashoutController',
      title: 'Cash Out',
      trackEvent: 'View Cash Out',
      resolve: { person: personResolver }
    }, defaultRouteOptions));

  }).

  controller('CashoutController', function($scope) {

    // TODO fucking win at life

  });