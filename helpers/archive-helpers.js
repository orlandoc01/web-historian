var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    var arr = data.split('\n');
    callback(arr);
  });
};

exports.isUrlInList = function(target, callback) {
  exports.readListOfUrls(function(urls) {
    callback(urls.indexOf(target) !== -1);
  });
};

exports.addUrlToList = function(newUrl, callback) {
  fs.appendFile(exports.paths.list, newUrl + "\n", function(err) {
    if (err) throw err;
    callback();
  });
};

exports.isUrlArchived = function(target, callback) {
  fs.access(path.join(exports.paths.archivedSites, target), fs.R_OK | fs.W_OK, function(err) {
    if(err) {
      callback(false);
    } else {
      callback(true);
    }
  });
  //
};

exports.downloadUrls = function() {
};






