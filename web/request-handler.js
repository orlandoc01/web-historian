var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!


//requests to '/'
var rootActions = {
  'GET': function(req, resp) {
    fs.readFile(path.join(archive.paths.siteAssets,"/index.html"),
     (err, data) => {
      if(err) {
        console.error(err);
      }
      httpHelpers.sendResponse(resp, data);
     });
  },

  'POST': function() {},

};
            
exports.handleRootRequest = httpHelpers.makeHandler(rootActions);
