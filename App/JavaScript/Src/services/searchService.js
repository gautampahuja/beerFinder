(function() {
    'use strict';

    var appServices = angular.module('app.services', []);
    appServices.factory('searchService', ['$http', '$q', function($http, $q) {
        var API_KEY = '34413dca2e90874d297dc41d77bb527a';
        var BASE_URL = 'http://api.brewerydb.com/v2/';
        var maxResults = 20;
        var modalData = null;
        var searchService = {
            searchBeers: searchBeers,
            getBookDetails: getBookDetails,
            setData: setData,
            getData: getData
        };

        function setData(data) {
            modalData = data;
        }

        function getData() {
            return modalData;
        }

        function getBookDetails(id) {
            var url = 'https://www.googleapis.com/books/v1/volumes/' + id;
            var deferred = $q.defer();
            $http({
                url: url,
                method: 'GET',
                headers: {
                    callback: 'JSON_CALLBACK',
                    key: API_KEY
                }
            }).success(function(resp) {
                deferred.resolve(resp);
            }).error(function() {

            });
            return deferred.promise;
        }

        function searchBeers(query, startIndex) {
            var url = BASE_URL + 'search?type=beer&q=' + query + '&key=' + API_KEY;
            var deferred = $q.defer();
            $http.get(url).success(function(resp) {
                deferred.resolve(resp);
            }).error(function() {
                deferred.resolve(-1);
            });
            return deferred.promise;
        }
        return searchService;
    }]);
}());
