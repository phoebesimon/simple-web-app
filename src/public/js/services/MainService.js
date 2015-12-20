// public/js/services/NerdService.js
angular.module('NerdService', []).factory('Main', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/');
        },
    }       
}]);
