(function() {
    'use strict';

    var appDirectives = angular.module('app.directives', []);

    appDirectives.directive('appVersion', ['version', function(version) {
        return function(scope, elm) {
            elm.text(version);
        };
    }]);
}());
