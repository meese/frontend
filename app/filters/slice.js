'use strict';

angular.module('app.filters').filter('slice', function() {
  return function(a,start,end) {
    if (!a) { return []; }
    return a.slice(start,end);
  };
});