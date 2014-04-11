'use strict';

angular.module('factories').factory('NavElement', function($location) {

  return function(name, urls, resolver) {
    this.name = name;
    this.urls = angular.isArray(urls) ? urls : [urls];
    this._show = true;

    var self = this;

    if (angular.isDefined(resolver)) {
      this._show = false;
      resolver.then(function(show) {
        self._show = show;
      });
    }

    this.active = function() {
      for (var i=0; i<this.urls.length; i++) {
        if (this.urls[i] === $location.path()) {
          return true;
        }
      }
      return false;
    };

    this.href = function() {
      return this.urls[0];
    };
  };

});