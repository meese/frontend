'use strict';

angular.module('activity').directive('transactionNavPills', function($rootScope, NavElement) {

  return {
    restrict: 'EAC',
    templateUrl: 'app/activity/directives/transactionNavPills.html',
    scope: true,
    link: function(scope) {

      scope.pills = [
        new NavElement('Orders', '/activity/transactions'),
        new NavElement('Cash Outs', '/activity/transactions/cash_outs')
      ];

      $rootScope.$watch('current_person', function(person) {
        if (person && person.account && person.account.balance > 0) {
          scope.pills.push(new NavElement('Request Cash Out', '/activity/transactions/cash_outs/new'));
        }
      });

    }
  };

});
