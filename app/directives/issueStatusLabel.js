'use strict';

angular.module('app.directives').directive('issueStatusLabel', function() {
  return {
    restrict: "E",
    scope: {
      issue: "="
    },
    templateUrl: "pages/issues/partials/status_label.html"
  };
});