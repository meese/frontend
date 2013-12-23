'use strict';

angular.module('app')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'pages/home/home.html',
        controller: 'HomeController'
      });
  })
  .controller('HomeController', function ($scope, $api) {
    $api.bounty_info().then(function(bounty_info) {
      $scope.bounty_info = bounty_info;
    });
  });
