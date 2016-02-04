var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!


//function which maps url to local file
var routeUrl = function(request) {
 
};




//requests to '/'
var rootActions = {
  'GET': function(req, resp) {
    var asset;
    var route = url.parse(req.url).pathname;
    if (route === '/') {
       asset = path.join(archive.paths.siteAssets,'/index.html');
       httpHelpers.serveAssets(resp, asset);
    } else {
      var cachedFile = route.slice(1);
      archive.isUrlArchived(cachedFile, function(found) {
        if(found) {
          asset = path.join(archive.paths.archivedSites, cachedFile);
          httpHelpers.serveAssets(resp, asset); 
        } else {
          httpHelpers.sendResponse(resp, 'File not found', 404);
        }
      });
    }
  },

  'POST': function(req, res) {
    httpHelpers.collectData(req, function(data) {
      var newURL = data.split('=')[1];
      archive.addUrlToList(newURL, function() {
        console.log('added to list');
        httpHelpers.sendResponse(res, 'Added', 302);
      });
    });
  },

};
            
exports.handleRequest = httpHelpers.makeHandler(rootActions);