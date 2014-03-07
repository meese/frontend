'use strict';

angular.module('angulartics.mixpanel', ['angulartics'])
  .config(['$analyticsProvider', function ($analyticsProvider) {
    angulartics.waitForVendorApi('mixpanel', 500, function (mixpanel) {
      $analyticsProvider.registerEventTrack(function (action, properties) {
        mixpanel.track(action, properties);
      });
    });
  }]);

angular.module('app').service('mixpanelEvent', function($location, $analytics) {

  this.track = function(event_name, options) {
    options = options || {};
    var payload = angular.extend({ page: $location.path() }, options);
    $analytics.eventTrack(event_name, payload);
  };

  this.bountyStart = function(options) {
    $analytics.track('Bounty Start', angular.extend({ type: '$direct' }, options||{}));
  };

  this.pledgeStart = function(options) {
    $analytics.track('Pledge Start', angular.extend({ type: '$direct' }, options||{}));
  };

  this.plegeCreate = function (options) {
    $analytics.track('Pledge Create', angular.extend({ type: 'Personal Balance' }, options||{}));
  };

});

angular.module('app')
  .run(function($rootScope, $location, mixpanelEvent) {

    $rootScope.$on('$routeChangeSuccess', function(routeChangeEvent, currentRoute) {
      mixpanelEvent.track(currentRoute.$$route.event || 'View Page', currentRoute.params);
    });

  });
