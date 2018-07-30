(function() {
    'use strict';

    angular.module('templates', []);

    var app = angular.module('app', [
        'ngRoute',
        'ngAnimate',
        'templates',
        'app.filters',
        'app.services',
        'app.directives',
        'app.controllers',
        'ui.bootstrap',
        'bw.paging'
    ]).value('version', '0.1');

    app.config(['$routeProvider', function($routeProvider) {
        //$locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            }).when('/details', {
                templateUrl: 'bookDetails.html'
            });

        $routeProvider.otherwise({ redirectTo: '/' });
    }]);
}());
