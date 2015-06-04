var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

var listOfSitesInMem = {};

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
  fs.readFile(exports.paths.list, function(error, data){
    var fileContents;
    if(!error){
      fileContents = data.toString().split("\n");
      for (var i = 0; i < fileContents.length - 1; i++) {
        listOfSitesInMem[fileContents[i]] = null;
      }
      console.log(listOfSitesInMem);
    }
    else{
        console.log(error);
    }
  });
};

exports.isUrlInList = function(urlString){
  console.log(listOfSitesInMem);
  return listOfSitesInMem.hasOwnProperty(urlString);
};


exports.addUrlToList = function(url, cb){
  listOfSitesInMem[url] = null;
  console.log("updated listOfSitesInMem, now has: ");
  console.log(listOfSitesInMem);
  var data = "";
  for (var key in listOfSitesInMem) {
    data += key + '\n';
  }
  fs.writeFile(exports.paths.list, data, function(err) {
    if (err) {
      console.log("ERROR: could not write to file");
    } else {
      cb();
    }
  });
};

exports.isURLArchived = function(url, func){

    fs.readFile(exports.paths.archivedSites + "/" + url + '.html', function(error, data){
        if(!error){
          console.log("INSIDE ISURLARCHIVED:  ");
          func();
        }
        else{
          console.log(error);
          return false;
        }
    });

};

exports.downloadUrls = function(url){

  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html

  request('http://' + url, function(error, response, html){

      // First we'll check to make sure no errors occurred when making the request

      if(!error){
        fs.writeFile(exports.paths.archivedSites + '/' + url + '.html', html, function(err) {
          if (err) {
            console.log("ERROR: could not write to file");
          } else {
            console.log("File updated");
          }
        });
      }
  });

};
