(function() {
    'use strict';

    var appDirectives = angular.module('app.directives');

    appDirectives.directive('searchInput', ['searchService', '$location', function(searchService, $location) {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                results: '=ngModel',
                order: '=orderProp',
                query: '=value'
            },
            template: [
                '<div>',
                    '<form name="searchForm" novalidate ng-submit="search(searchForm.$valid, query, 0)">',
                        '<div class="form-group search-area"><input autofocus="" name="searchBox" id="searchBox" ng-model="query" type="search" placeholder="Search thousands of beers..." required value="" class="form-control searchBox"></div>',
                    '</form>',
                    '<label ng-show="results.data.length>0" class="sort-by-options">Sort by:',
                        '<select ng-change="changedvalue()" id="option" ng-model="order">',
                            '<option value="name">Name</option>',
                            '<option selected="selected" value="abv">% ABV</option>',
                            '<option selected="selected" value="style.ibuMax">IBU(High to Low)</option>',
                            '<option selected="selected" value="style.ibuMin">IBU(Low to High)</option>',
                        '</select>',
                    '</label>',
                '</div>'
            ].join(''),
            link: function(scope) {
                scope.changedvalue = function() {
                    console.log(scope.order);
                    scope.option = true;
                };
                scope.isLoading = false;
                scope.search = function(valid, query, startIndex) {
                    if (valid) {
                        scope.isLoading = true;
                        searchService.searchBeers(query, startIndex).then(function(resp) {
                            console.log(resp);
                            scope.results = resp;
                            scope.isLoading = false;
                            $location.search('q', query);
                        });
                    }
                };
                if ($location.search().q !== undefined) {
                    scope.query = $location.search().q;
                    scope.search(true, $location.search().q, 0);
                }
            }
        };
    }]);
}());
