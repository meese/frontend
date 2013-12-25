'use strict';

angular.module('app.filters').filter('atLeast', function () {
  return function (input, other) {
    return (input > other) ? input : other;
  };
});