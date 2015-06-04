// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var http = require('http');
var url = require('url');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var workHandler = require("./workHandler");
var request = require('request');


// var port = 8081;
// var ip = "127.0.0.1";
// var worker = http.createServer(handler.handleRequest);
// console.log("Listening on http://" + ip + ":" + port);
// worker.listen(port, ip);


// Worker's tasks:

// load sites.txt into memory
// go through listOfSitesInMem
//   download each site to archive
// exit
