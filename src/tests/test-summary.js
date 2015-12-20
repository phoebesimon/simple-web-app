var test = require('tape');
var htmlparser = require("htmlparser");
var summary = require('../app/summary');


test('test createSummary simple', function (t) {
    var handler = new htmlparser.DefaultHandler(function (error, dom) {
            var expected = {
                    div: 1
                };
            t.error(error, 'Should not error parsing the HMTL');
            t.deepEqual(summary.createSummary(dom), expected, 'We should get an object with a value of 1 for div');
            t.end();
        }),
        parser = new htmlparser.Parser(handler);

    parser.parseComplete('<div>blah</div>');
});

test('test createSummary simple child tag', function (t) {
    var handler = new htmlparser.DefaultHandler(function (error, dom) {
            var expected = {
                    div: 1,
                    span: 1
                };
            t.error(error, 'Should not error parsing the HMTL');
            t.deepEqual(summary.createSummary(dom), expected, 'Should have 1 div, 1 span');
            t.end();
        }),
        parser = new htmlparser.Parser(handler);

    parser.parseComplete('<div><span>blah</span></div>');
});

test('test createSummary simple sibling tag', function (t) {
    var handler = new htmlparser.DefaultHandler(function (error, dom) {
            var expected = {
                    div: 1,
                    b: 1
                };
            t.error(error, 'Should not error parsing the HMTL');
            t.deepEqual(summary.createSummary(dom), expected, 'Should have 1 div, 1 b');
            t.end();
        }),
        parser = new htmlparser.Parser(handler);

    parser.parseComplete('<div>blah</div><b>foo</b>');
});

test('test createSummary multiple children tags', function (t) {
    var handler = new htmlparser.DefaultHandler(function (error, dom) {
            var expected = {
                    div: 2,
                    b: 1,
                    span: 1
                };
            t.error(error, 'Should not error parsing the HMTL');
            t.deepEqual(summary.createSummary(dom), expected, 'Should have 2 divs, 1 b, 1 span');
            t.end();
        }),
        parser = new htmlparser.Parser(handler);

    parser.parseComplete('<div><span>blah</span><div>bar</div></div><b>foo</b>');
});

test('test createSummary multiple children tags', function (t) {
    var handler = new htmlparser.DefaultHandler(function (error, dom) {
            var expected = {
                div: 2,
                b: 1,
                span: 1
            };
            t.error(error, 'Should not error parsing the HMTL');
            t.deepEqual(summary.createSummary(dom), expected, 'Should have 2 divs, 1 b, 1 span');
            t.end();
        }),
        parser = new htmlparser.Parser(handler);

    parser.parseComplete('<div><span>blah</span><div>bar</div></div><b>foo</b>');
});