'use strict';

angular.module('app.filters').filter('atMost', function () {
  return function (input, other) {
    return (input < other) ? input : other;
  };
});