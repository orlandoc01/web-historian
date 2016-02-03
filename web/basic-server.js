var http = require("http");
var handler = require("./request-handler");
var httpHelper = require('./http-helpers.js');
var initialize = require("./initialize.js");
var url = require('url');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize("./archives");

var router = {
  '/': handler.handleRootRequest
};

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(function(req, res) {
  var route = url.parse(req.url).pathname;
  var routeAction = router[route];
  if (routeAction) {
    routeAction(req, res);
  } else {
    httpHelper.sendResponse(res, 'Invalid Route', 404);
  }
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

