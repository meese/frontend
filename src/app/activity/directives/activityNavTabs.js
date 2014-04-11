'use strict';

angular.module('activity').directive('activityNavTabs', function(NavElement) {

  return {
    restrict: 'EAC',
    templateUrl: 'app/activity/directives/activityNavTabs.html',
    scope: true,
    link: function(scope) {

      scope.tabs = [
        new NavElement('Timeline',      '/activity'),
        new NavElement('Bounties',      '/activity/bounties'),
        new NavElement('Fundraisers',   '/activity/fundraisers'),
        new NavElement('Pledges',       '/activity/pledges'),
        new NavElement('Bounty Claims', '/activity/claims'),
        new NavElement('Transactions',  ['/activity/transactions', '/activity/transactions/cash_outs'])
      ];

    }
  };

});