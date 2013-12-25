'use strict';

angular.module('app.filters').filter('round', function () {
  return function (input) {
    return Math.round(input);
  };
});