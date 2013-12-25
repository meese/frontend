'use strict';

angular.module('app.filters').filter('hex', function() {
  return function(input) {
    if (input) {
      return input.replace(/[^0-9a-f]/i, "");
    }
  };
});