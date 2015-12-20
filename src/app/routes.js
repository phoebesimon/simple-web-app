 // app/routes.js
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

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
  app.get('/url', function(req, res) {
    var url = req.query.url,
        info = {},
        handler = new htmlparser.DefaultHandler(function (error, dom) {
          if (error)
              console.error('Error parsing html: ', error); //TODO what to do on error?
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
            console.log('ERROR: ', err); //TODO What to do on err?
        }
        parser.parseComplete(body);

    });
  });
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
}