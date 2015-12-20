// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

    $scope.urlResponse = {html: ''};

    $scope.url = {
      value: 'http://www.google.com',
      pattern: '.*' ///^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    };   

   $scope.submit = function() {
       $http({
           method: 'GET',
           url: '/url?url=' + $scope.url.value
       }).then(function successCallback(response) {
           // this callback will be called asynchronously
           // when the response is available
           console.log('Success! ', response)
           $scope.urlResponse = response.data;
       }, function errorCallback(response) {
           // called asynchronously if an error occurs
           // or server returns response with an error status.
           console.log('ERROR GET-ing URL', response)
           $scope.urlError = response;
       });
   }

   $scope.highlight = function(key) {
       console.log('WOULD HAVE HIGHLIGHTED', key)
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
            if (phrase) text = text.replace(new RegExp('(&lt;(&#x2F;)?' + phrase + '.*?&gt;)', 'gi'),
                '<span class="highlighted">$1</span>')

            return $sce.trustAsHtml(text)
        }
    });
