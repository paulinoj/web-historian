var http = require('http');
var url = require('url');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var request = require('request');




url = 'http://www.google.com';

// The structure of our request call
// The first parameter is our URL
// The callback function takes 3 parameters, an error, response status code and the html

request(url, function(error, response, html){

    // First we'll check to make sure no errors occurred when making the request

    if(!error){
      fs.writeFile(exports.paths.list, html, function(err) {
        if (err) {
          console.log("ERROR: could not write to file");
        } else {
          console.log("File updated");
        }
      });
    }
});
