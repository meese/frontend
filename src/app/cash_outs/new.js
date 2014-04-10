'use strict';

angular.module('app').
  config(function($routeProvider, defaultRouteOptions, personResolver) {

    $routeProvider.when('/cash_outs/new', angular.extend({
      templateUrl: 'app/cash_outs/new.html',
      controller: 'NewCashoutController',
      title: 'New Cash Out',
      trackEvent: 'View Cash Out',
      resolve: { person: personResolver }
    }, defaultRouteOptions));

  });