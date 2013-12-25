'use strict';

// Looks at a model and provides a link to its owner's profile.
// Polymorphic on model.owner_type
angular.module('app.directives').directive('ownerProfileLink', function() {
  return {
    restrict: "E",
    transclude: true,
    replace: true,
    scope: {
      model: "="
    },
    template: '<a ng-transclude></a>',
    link: function(scope, element) {
      scope.$watch("model", function(model) {
        try {
          if (model) {
            if (!model.owner) {
              throw("Model is missing owner");
            } else if (!model.owner.type) {
              throw("Model is missing owner.type attribute");
            } else if (model.owner.type === "Person") {
              element.attr("href", "/people/"+model.owner.slug);
            } else if ((/^Team/).test(model.owner.type)) {
              element.attr("href", "/teams/"+model.owner.slug);
            } else {
              throw("Unexpected owner " + model.owner.type);
            }
          }
        } catch(e) {
        }
      });
    }
  };
});