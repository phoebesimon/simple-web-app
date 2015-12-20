 var request = require('request');
 var htmlparser = require("htmlparser");

 /**
  * Sets `counts` to have counts of all tags within a parsed dom object.
  * @param dom Parsed html object.
  * @param counts An object.
  */
 function createSummary(dom, counts) {
     dom.forEach(function(obj) {
         if (obj.type === 'tag' || obj.type === 'script') {
             if (!counts.hasOwnProperty(obj.name)) {
                 counts[obj.name] = 1;
             } else {
                 counts[obj.name]++;
             }
             if (obj.children) {
                 createSummary(obj.children, counts);
             }
         }
     });
 }

module.exports = function(app) {
  app.get('/url', function(req, res) {
    var url = req.query.url,
        info = {},
        handler = new htmlparser.DefaultHandler(function (error, dom) {
          if (error) {
              res.status(500).json({error: error});
              return;
          }
          else {
              var summary = {};
              createSummary(dom, summary);
              info.summary = summary; //TODO make better
              res.json(info);
          }
        });
      var parser = new htmlparser.Parser(handler);

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
