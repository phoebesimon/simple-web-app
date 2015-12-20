angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {
    $scope.urlResponse = {html: ''};
    $scope.url = {
      value: '',
      pattern: /^https?:\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/
    };   

   $scope.submit = function() {
       $scope.urlError = null;
       $scope.searchTag = null;
       $scope.urlResponse = {html: ''};
       $http({
           method: 'GET',
           url: '/url?url=' + $scope.url.value
       }).then(function successCallback(response) {
           // this callback will be called asynchronously
           // when the response is available
           $scope.urlResponse = response.data;
       }, function errorCallback(response) {
           // called asynchronously if an error occurs
           // or server returns response with an error status.
           $scope.urlError = response;
       });
   };

   $scope.highlight = function(key) {
       $scope.searchTag = key;
   };

}).filter('escapeHtml', function () {

    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    return function(str) {
        return String(str).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });
    }
}).filter('highlight', function($sce) {
        return function(text, phrase) {
            if (phrase) text = text.replace(new RegExp('(&lt;(&#x2F;)?' + phrase + '.*?([\s\S\n\t]*?).*?&gt;)', 'gmi'),
                '<span class="highlighted">$1</span>');

            return $sce.trustAsHtml(text);
        }
    });
