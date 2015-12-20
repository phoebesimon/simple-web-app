describe('The controller', function() {
    var $controller, $httpBackend, escapeHtmlFilter, highlightFilter;

    // Setup for all tests
    beforeEach(function(){
        // loads the app module
        module('htmlAnalyzer');
        inject(function(_$controller_){
            // inject removes the underscores and finds the $controller Provider
            $controller = _$controller_;
        });
        inject(function(_$injector_) {
            $httpBackend = _$injector_.get('$httpBackend');
            escapeHtmlFilter = _$injector_.get('escapeHtmlFilter');
            highlightFilter = _$injector_.get('highlightFilter');
        });
    });

    // Test (spec)
    it('should set the searchTag to a provided value', function() {
        var $scope = {};
        // $controller takes an object containing a reference to the $scope
        var controller = $controller('MainController', { $scope: $scope });
        $scope.highlight('html');
        expect($scope.searchTag).toEqual('html');
    });

    it('should set urlResponse to the proper data', function() {
        var $scope = {},
            url = 'http://www.google.com',
            responseObj = {
                html: '<div>Blah</div>',
                summary: {div: 1}
            };
        var controller = $controller('MainController', { $scope: $scope });
        $scope.url.value = url;
        $httpBackend.expectGET('/url?url=' + url).respond(200, responseObj);
        $scope.submit();
        $httpBackend.flush();
        expect(_.isEqual($scope.urlResponse, responseObj)).toBeTruthy();
        expect(_.isEqual($scope.urlError, null)).toBeTruthy();
    });

    it('should set urlError if the URL is invalid', function() {
        var $scope = {},
            badUrl = 'http://www.google.12com',
            responseObj = {
                error: {}
            };
        var controller = $controller('MainController', { $scope: $scope });
        $scope.url.value = badUrl;
        $httpBackend.expectGET('/url?url=' + badUrl).respond(400, responseObj);
        $scope.submit();
        $httpBackend.flush();
        expect(_.isEqual($scope.urlResponse, {html: ''})).toBeTruthy();
        expect(_.isEqual($scope.urlError.data, responseObj)).toBeTruthy();
        expect($scope.urlError.status).toEqual(400);
    });

    it('should escape html', function() {
        expect(escapeHtmlFilter('<div>blah</div>')).toEqual('&lt;div&gt;blah&lt;&#x2F;div&gt;');
    });

    it('should highlight a given tag', function() {
        expect(highlightFilter(escapeHtmlFilter('<div>blah</div>'), 'div').toString())
            .toEqual('<span class="highlighted">&lt;div&gt;</span>blah<span class="highlighted">&lt;&#x2F;div&gt;</span>');
    });


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});