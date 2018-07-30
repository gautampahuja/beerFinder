(function() {
    'use strict';

    var appFilters = angular.module('app.filters', []);

    appFilters.filter('sanitize', ['$sce', function($sce) {
        return function(htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
    }]);
}());
