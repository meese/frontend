'use strict';

angular.module('app.directives').directive('favicon', function() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      domain: "@"
    },
    template: '<img ng-src="https://www.google.com/s2/favicons?domain={{domain}}" />'
  };
});