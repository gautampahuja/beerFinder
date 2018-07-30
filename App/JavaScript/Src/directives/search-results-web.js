(function() {
    'use strict';

    var appDirectives = angular.module('app.directives');

    appDirectives.directive('searchResultsWeb', ['searchService', '$location', '$modal', function(searchService, $location, $modal) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                results: '=ngModel',
                order: '=orderProp'
            },
            templateUrl:'App/Templates/search-results.html',
            link: function(scope, $rootScope) {
                scope.currentPage = 1;
                scope.showDetails = function(data) {
                    searchService.setData(data);
                    $rootScope.modalInstance = $modal.open({
                        templateUrl: 'App/Templates/details.html',
                        size: 'lg',
                        controller: 'DetailController',
                        resolve: {}
                    });
                    $rootScope.modalInstance.result.then(function() {
                    }, function() {
                    })['finally'](function() {
                        $rootScope.modalInstance = undefined;
                    });
                };
                scope.changePage = function(startIndex) {
                    var query = $location.search().q;
                    searchService.searchBeers(query, startIndex - 1).then(function(resp) {
                        console.log(resp);
                        scope.results = resp;
                    });
                };
            }
        };
    }]);
}());
