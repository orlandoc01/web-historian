// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var http = require('http');
var archive = require('../helpers/archive-helpers.js');

archive.readListOfUrls( function(urls) {
  urls.forEach( function(url) {
    archive.isUrlArchived(url, function(found) {
      if(!found) {
        archive.downloadUrls([url]);
      }
    });
  });
});