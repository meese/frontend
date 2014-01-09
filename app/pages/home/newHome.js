'use strict';

angular.module('app')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/issues', {
        templateUrl: 'pages/home/newHome.html',
        controller: 'newHomeCtrl'
      });
  })
  .controller('newHomeCtrl', function ($scope, $window, $api) {
    $scope.tabs_resolved = false;

    $scope.set_current_saved_search_tab = function(selected_tab) {
      for (var i=0;i<$scope.tabs_collection.length;i++) {
        var tab = $scope.tabs_collection[i];
        if (selected_tab === tab) {
          $scope.current_saved_search_tab = selected_tab;
          if (!selected_tab.issues) {
            $scope.construct_tab_results(selected_tab);
          } else {
            $scope.tab_results_resolved = true; //set to true in case tab results are cached and user has clicked over from a tab with results still in loading process
          }
          break;
        }
      }
    };

    $scope.construct_tab_results = function(tab) {
      $scope.tab_results_resolved = false;
      $api.call(tab.query).then(function(response) {
        var issues;
        if (response.issues) {
          issues = response.issues;
        } else {
          issues = response;
        }
        if (!issues.error) {
          for (var i=0;i<issues.length;i++) {
            var issue = issues[i];
            // sorting doesn't like nulls.. this is a quick hack
            issue.participants_count = issue.participants_count || 0;
            issue.thumbs_up_count = issue.thumbs_up_count || 0;
            issue.comment_count = issue.comment_count || 0;
          }
        } else {
          issues = [];
        }

        tab.issues = issues;
        $scope.tab_results_resolved = true;
      });
    };

    $api.saved_search_tabs().then(function(tabs_collection) {
      $scope.tabs_collection = tabs_collection; //TODO sort by created_at
      if (tabs_collection[0]) {
        $scope.set_current_saved_search_tab(tabs_collection[0]); //then grab earliest item, set to current_saved_search_tab
      }
      $scope.tabs_resolved = true;
    });

    $scope.active_tab = function(tab) {
      if (tab === 'search' && !$scope.current_saved_search_tab) {
        return true;
      } else {
        return tab === $scope.current_saved_search_tab;
      }
    };

    $scope.remove_search_tab = function(tab) {
      for (var i=0;i<$scope.tabs_collection.length;i++) {
        if (tab === $scope.tabs_collection[i]) {
          if (tab === $scope.current_saved_search_tab) {
            $scope.set_current_saved_search_tab($scope.tabs_collection[i-1]);
          }
          $api.saved_search_remove($scope.tabs_collection[i].id);
          $scope.tabs_collection.splice(i,1);
          break;
        }
      }
    };

    $scope.set_search_tab = function() {
      $scope.current_saved_search_tab = null;
    };

    $scope.reset_form_data = function() {
      $scope.form_data = {search: "", min: "", max: "", name: ""};
    };

    $scope.reset_form_data();

    $scope.submit_saved_search = function(form_data, languages_selected, trackers_selected) {
      $scope.alert = false;

      form_data.languages = languages_selected.map(function(language) { return language.id; }) || "";
      form_data.language_names = languages_selected.map(function(language) { return language.name; });
      form_data.trackers = trackers_selected.map(function(tracker) { return tracker.id; }) || "";
      form_data.tracker_names = trackers_selected.map(function(tracker) { return tracker.name; });

      // needs to make form_data blank arrays if there is no value for them
      var query = "/search/bounty_search?search="+encodeURIComponent(form_data.search)+"&order=participants_count&direction=desc&languages=["+form_data.languages+"]&trackers=["+form_data.trackers+"]&min="+form_data.min+"&max="+form_data.max;
      var tab_name = form_data.name || form_data.search || form_data.language_names.join(" - ");
      var new_tab = { name: tab_name, query: query, locked: false };
      if (new_tab.name === "") {
        $scope.alert = "Please enter a name for your search.";
        return;
      }
      $api.saved_search_create(new_tab).then(function(response) {
        if (!response.hasOwnProperty("error")) {
          $scope.tabs_collection.push(response);
          $scope.set_current_saved_search_tab(response);
          $scope.reset_form_data();
          $scope.trackers_selected = [];
          $scope.languages_selected = [];
        } else {
          $scope.alert = response.error;
        }
      });
    };

    $scope.languages = [];
    $scope.languages_selected = [];
    $api.languages_get().then(function(languages) {
      languages.sort(function(a,b) {
        return (a.weight > b.weight ? -1 : (a.weight === b.weight ? 0 : 1));
      });

      $scope.$watch('selected_language', function(newValue, oldValue, scope) {
        for (var i = 0; i < languages.length; i++) {
          if (!newValue) {
            break;
          }
          if (newValue.id === languages[i].id) {
            scope.languages_selected.push(newValue);
            scope.selected_language = "";
            break;
          }
        }
      });

      $scope.languages = angular.copy(languages);
      return $scope.languages;
    });

    $scope.trackers_selected = [];
    $scope.doTypeahead = function ($viewValue) {
      return $api.tracker_typeahead($viewValue).then(function (trackers) {
        $scope.$watch('selected_tracker', function(newValue, oldValue, scope) {
          for (var i = 0; i < trackers.length; i++) {
            if (!newValue) {
              break;
            }
            if (newValue.id === trackers[i].id) {
              scope.trackers_selected.push(newValue);
              scope.selected_tracker = "";
              break;
            }
          }
        });
        return trackers;
      });
    };

    //removes trackers from trackers_selected array
    $scope.remove_tracker = function(tracker) {
      for (var i = 0; i < $scope.trackers_selected.length; i++) {
        if (tracker.id === $scope.trackers_selected[i].id) {
          $scope.trackers_selected.splice(i, 1);
          break;
        }
      }
    };

    //removes languages from selected_languages array
    $scope.remove_language = function(language) {
      for (var i = 0; i < $scope.languages_selected.length; i++) {
        if (language.id === $scope.languages_selected[i].id) {
          $scope.languages_selected.splice(i, 1);
          break;
        }
      }
    };

  });
