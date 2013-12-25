'use strict';

angular.module('app.directives').directive('projectCard', function() {
  return {
    restrict: "E",
    scope: {
      project: "="
    },
    templateUrl: "pages/trackers/partials/homepage_card.html"
  };
});