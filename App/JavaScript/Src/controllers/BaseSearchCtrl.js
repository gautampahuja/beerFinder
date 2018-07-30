(function() {
    'use strict';

    var appControllers = angular.module('app.controllers', []);

    appControllers.controller('BaseSearchCtrl', function() {
        var vm = this;
        vm.results = '';
        vm.query = '';
        vm.orderProp = 'name';
    });

    appControllers.controller('DetailController', function(searchService, $scope) {
        $scope.modalData = searchService.getData();
        console.log($scope.modalData);
    });
}());