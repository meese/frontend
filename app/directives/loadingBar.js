'use strict';

angular.module('app.directives').directive('loadingBar', function() {
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    template: '<div class="text-center"><p class="lead" ng-transclude></p><div class="progress progress-striped active"><div class="progress-bar progress-bar-info" role="progressbar" style="width: 100%;"></div></div></div>'
  };
});