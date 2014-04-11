'use strict';

angular.module('activity')
  .config(function($routeProvider, personResolver, defaultRouteOptions) {

    $routeProvider.when('/activity/bounties', angular.extend({
      templateUrl: 'app/activity/bounties.html',
      controller: 'BountiesController',
      resolve: { person: personResolver },
      trackEvent: 'View My Bounties'
    }, defaultRouteOptions));

    $routeProvider.when('/activity/claims', angular.extend({
      templateUrl: 'app/activity/bounty_claims.html',
      controller: 'BountyClaimsController',
      resolve: { person: personResolver },
      trackEvent: 'View My Claims'
    }, defaultRouteOptions));

    $routeProvider.when('/activity/fundraisers', angular.extend({
      templateUrl: 'app/activity/fundraisers.html',
      controller: 'FundraisersController',
      resolve: { person: personResolver },
      trackEvent: 'View My Fundraisers'
    }, defaultRouteOptions));

    $routeProvider.when('/activity/pledges', angular.extend({
      templateUrl: 'app/activity/pledges.html',
      controller: 'PledgesController',
      resolve: { person: personResolver },
      trackEvent: 'View My Pledges'
    }, defaultRouteOptions));

    $routeProvider.when('/activity', angular.extend({
      templateUrl: 'app/activity/timeline.html',
      controller: 'TimelineController',
      resolve: { person: personResolver },
      trackEvent: 'View My Timeline'
    }, defaultRouteOptions));

    $routeProvider.when('/activity/transactions', angular.extend({
      templateUrl: 'app/activity/transactions.html',
      controller: 'TransactionsController',
      resolve: { person: personResolver },
      trackEvent: 'View My Transactions'
    }, defaultRouteOptions));

    $routeProvider.when('/activity/transactions/cash_outs', angular.extend({
      templateUrl: 'app/activity/cashOuts/index.html',
      controller: 'CashOutsController',
      resolve: { person: personResolver },
      trackEvent: 'View My Cash Outs'
    }, defaultRouteOptions));

    $routeProvider.when('/activity/transactions/cash_outs/new', angular.extend({
      templateUrl: 'app/activity/cashOuts/new.html',
      controller: 'NewCashOutController',
      resolve: { person: personResolver },
      trackEvent: 'View Request Cash Out'
    }, defaultRouteOptions));


  }).

  factory('NavElement', function($location) {

    return function(name, urls) {
      this.name = name;
      this.urls = angular.isArray(urls) ? urls : [urls];

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