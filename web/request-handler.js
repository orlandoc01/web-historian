var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!


//requests to '/'
var rootActions = {
  'GET': function(req, resp) {
    fs.readFile(path.join(archive.paths.siteAssets,"/index.html"),
     function (err, data) {
      if(err) {
        console.error(err);
      }
      httpHelpers.sendResponse(resp, data);
     });
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
            
exports.handleRootRequest = httpHelpers.makeHandler(rootActions);