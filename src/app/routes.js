 var request = require('request');
 var htmlparser = require("htmlparser");
 var summary = require('./summary');

module.exports = function(app) {
  app.get('/url', function(req, res) {
    var url = req.query.url,
        info = {},
        handler = new htmlparser.DefaultHandler(function (error, dom) {
          if (error) {
              res.status(500).json({error: error});
          }
          else {
              info.summary = summary.createSummary(dom);
              res.json(info);
          }
        }),
        parser = new htmlparser.Parser(handler);

    request.get(url, function(err, response, body) {
        info.html = body;
        if (err) {
            res.status(400).json({error: err});
            return;
        }
        parser.parseComplete(body);

    });
  });
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
};
