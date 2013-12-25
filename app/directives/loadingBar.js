'use strict';

angular.module('app.directives').directive('loadingBar', function() {
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    template: '<div><div class="text-center"><p class="lead" ng-transclude></p><progress percent="100" class="progress-striped active"></progress></div></div>'
  };
});