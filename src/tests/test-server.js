var test = require('tape');
var request = require('request');
var server = require('../server');

test('test main', function (t) {
    t.plan(2);
    request.get('http://localhost:8080')
        .on('response', function (response) {
            t.ok(response, 'Response should not be null');
            t.equal(response.statusCode, 200, 'Response should be 200');
        }).on('error', function (err) {
        t.error(err, 'Should not fail to return a proper response');
    });
});

test('test url fail', function (t) {
    t.plan(2);
    request.get('http://localhost:8080/url')
        .on('response', function (response) {
            t.ok(response, 'Response should not be null');
            t.equal(response.statusCode, 400, 'Response should be 400 because we did not pass a url');
        }).on('error', function (err) {
        t.error(err, 'Should not fail to return a proper response');
    });
});

test('test url success', function (t) {
    t.plan(2);
    request.get('http://localhost:8080/url?url=http://localhost:8080')
        .on('response', function (response) {
            t.ok(response, 'Response should not be null');
            t.equal(response.statusCode, 200, 'Response should be 200 because we passed a real url');
        }).on('error', function (err) {
        t.error(err, 'Should not fail to return a proper response');
    });
});

test('Close', function(t) {
    server.server.close();
    t.end();
});