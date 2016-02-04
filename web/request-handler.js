var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!


//requests to '/'
var rootActions = {
  'GET': function(req, resp) {
    var asset;
    var route = url.parse(req.url).pathname;
    if (route === '/') {
       asset = path.join(archive.paths.siteAssets,'/index.html');
       httpHelpers.serveAssets(resp, asset);
    } else if(route === '/styles.css') {
      asset = path.join(archive.paths.siteAssets, '/styles.css');
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

  'POST': function(req, resp) {
    httpHelpers.collectData(req, function(data) {
      var newURL = data.split('=')[1];
      var asset;
      archive.isUrlInList(newURL, function(found) {
        if (found) {
          archive.isUrlArchived(newURL, function(archived) {
            if (archived) {
              asset = path.join(archive.paths.archivedSites, newURL);              
            } else {
              asset = path.join(archive.paths.siteAssets,'/loading.html');
            }
            httpHelpers.serveAssets(resp, asset);
          
          });
        } else {
          archive.addUrlToList(newURL, function() {
            httpHelpers.sendResponse(resp, 'Added', 302);
          });
        }
      }); 
    });
  }
};
            
exports.handleRequest = httpHelpers.makeHandler(rootActions);