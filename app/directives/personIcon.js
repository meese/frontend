'use strict';

angular.module('app.directives').directive('personIcon', function() {
  return {
    restrict: "E",
    scope: {
      person: "=",
      size: "@",
      format: "@"
    },
    templateUrl: "pages/issues/partials/person_icon.html",
    replace: true
  };
});