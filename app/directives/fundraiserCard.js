'use strict';

angular.module('app.directives').directive('fundraiserCard', function() {
  return {
    restrict: "E",
    scope: {
      fundraiser: "="
    },
    templateUrl: "pages/fundraisers/partials/homepage_card.html"
  };
});