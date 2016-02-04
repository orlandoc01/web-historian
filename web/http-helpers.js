var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var _ = require('../node_modules/underscore/underscore-min.js');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};


exports.sendResponse = function(res, data, statusCode, headerParams) {
  statusCode = statusCode || 200;
  var finalHeaders = _.extend({}, exports.headers, headerParams);
  res.writeHead(statusCode, finalHeaders);
  res.end(data);
};

exports.collectData = function(req, callback) {
  var body = "";
  req.on('data', function (chunk) {body += chunk; });
  req.on('end', function () {callback(body); });
};

exports.makeHandler = function(actionMap) {
  return function(req, resp) {
    var actionChosen = actionMap[req.method];
    if(actionChosen) {
      actionChosen(req, resp);
    } else {
      exports.sendResponse(resp, 'Invalid Request' , 404);
    }
  };
};

exports.serveAssets = function(resp, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  var assetArr = asset.split('.');
  var filetype = assetArr[assetArr.length - 1];

  fs.readFile(asset, function(err, data) {
    var headerParams = {};
    if(filetype === 'css') {
      headerParams['Content-Type'] = 'text/css';
    }
    exports.sendResponse(resp, data, 200, headerParams);
  });

};



// As you progress, keep thinking about what helper functions you can put here!
