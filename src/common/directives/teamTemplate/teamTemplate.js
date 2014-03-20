'use strict';

angular.module('directives').directive('teamTemplate', function($rootScope, $location, $routeParams, $api) {
  return {
    restrict: 'EAC',
    replace: true,
    transclude: true,
    templateUrl: 'common/directives/teamTemplate/templates/teamTemplate.html',
    link: function(scope) {

      // TODO bring back options hash
      scope.defaultOptions = {
        showTitle: true,
        showNavTabs: true
      };

      scope._options = angular.extend(scope.defaultOptions, scope.options||{});

      /*****************************
      * Navigation Tabs
      * */

      scope.activeNavTab = function(tab) {
        if (tab === 'home' && (/^\/teams\/[^\/]+$/).test($location.path())) { return true; }
        else if (tab === 'fundraiser' && (/^\/teams\/[^\/]+\/fundraisers?$/).test($location.path())) { return true; }
        else if (tab === 'members' && (/^\/teams\/[^\/]+\/members$/).test($location.path())) { return true; }
        else if (tab === 'activity' && (/^\/teams\/[^\/]+\/activity$/).test($location.path())) { return true; }
        else if (tab === 'manage' && (/^\/teams\/[^\/]+\/members\/manage$/).test($location.path())) { return true; }
        else if (tab === 'manage' && (/^\/teams\/[^\/]+\/settings$/).test($location.path())) { return true; }
        else if (tab === 'manage' && (/^\/teams\/[^\/]+\/account$/).test($location.path())) { return true; }
        else if (tab === 'projects' && (/^\/teams\/[^\/]+\/projects+$/).test($location.path())) { return true; }
        else if (tab === 'bounties' && (/^\/teams\/[^\/]+\/bounties$/).test($location.path())) { return true; }
        else if (tab === 'issues' && (/^\/teams\/[^\/]+\/issues$/).test($location.path())) { return true; }
      };

      /*****************************
       * Top Backers
       * */

      // Load backers after Team is ready
      scope.$watch('team', function(team) {
        if (team) {
          $api.v2.backers({
            team_id: team.id,
            per_page: 10,
            order: '+amount'
          }).then(function(response) {
            scope.backers = angular.copy(response.data);
          });
        }
      });

      /*****************************
       * Team Fundraisers
       * */

        // Load backers after Team is ready
      scope.$watch('team', function(team) {
        if (team) {
          $api.v2.fundraisers({
            team_id: team.id,
            include_description_html: true,
            in_progress: true
          }).then(function(response) {
            scope.fundraisers = angular.copy(response.data);
            scope.activeFundraiser = scope.fundraisers[0];
          });
        }
      });

    }
  };
});