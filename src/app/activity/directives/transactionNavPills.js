'use strict';

angular.module('activity').directive('transactionNavPills', function($rootScope, $api, $q, NavElement) {

  return {
    restrict: 'EAC',
    templateUrl: 'app/activity/directives/transactionNavPills.html',
    scope: true,
    link: function(scope) {

      var currentPersonHasMoneyDeferred = $q.defer();
      var currenPersonHasOrdersDeferred = $q.defer();

      $rootScope.$watch('current_person', function(person) {
        currentPersonHasMoneyDeferred.resolve(person && person.account && person.account.balance > 0);
      });

      $api.transaction_activity().then(function(transactions) {
        currenPersonHasOrdersDeferred.resolve(angular.isArray(transactions) && transactions.length > 0);
      });

      scope.pills = [
        new NavElement('Overview',  '/activity/account'),
        new NavElement('Orders', '/activity/transactions', currenPersonHasOrdersDeferred.promise),
        new NavElement('Cash Outs', '/activity/cash_outs'),
        new NavElement('Request Cash Out', '/activity/cash_outs/new', currentPersonHasMoneyDeferred.promise)
      ];

    }
  };

});
