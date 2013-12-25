'use strict';

angular.module('app.filters').filter('pluralize', function() {
  // add 's' to string if num is not 1
  return function(s,num) {
    if (s[s.length - 1] === 'y') {
      return s.slice(0, s.length-1) + (num !== 1 ? 'ies' : 'y');
    } else {
      return s + (num !== 1 ? 's' : '');
    }
  };
});