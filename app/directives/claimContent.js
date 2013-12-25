'use strict';

angular.module('app.directives').directive('claimContent', function() {
  return {
    restrict: "E",
    scope: {
      claim: "=",
      issue: "="
    },
    templateUrl: "pages/issues/partials/claim_content.html",
    replace: true
  };
});