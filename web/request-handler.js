var http = require('http');
var url = require('url');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
//var httphelp = require('./http-helpers.js');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var fname =  path.basename(url.parse(req.url, true).pathname);
  // you have to do it like that
  // to consider requests '/file.css' and '/file.css?id=xx' the same

  var ext = path.extname(req.url);
  var dname = path.dirname(req.url);
  console.log("EXT:  " + ext);
  // then we consider requests url with extension should be responded with static file
  if(ext !== '' && !mime.hasOwnProperty[ext]){

      serveStatic(dname, fname, ext, res);
  }
  else{
      // here we can do something non static:
      // if (req.method === 'POST') {
      //   console.log("A POSt REQUEST MADE");
      // }

      processNotStatic(req, res);
  }

//  remove line below:
//  res.end(archive.paths.list);
};

var mime = {
    ".txt": "text/plain",
    ".css": "text/css",
    ".js": "text/javascript",
    ".htm": "text/html",
    ".html": "text/html",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".ico": "image/x-icon"
};

function serveStatic(dname, fname, ext, res){
    var filePath = path.join(__dirname+dname, fname);
    console.log("FILEPATH:  " + filePath);
    fs.readFile(filePath, function(error, data){
        if(!error){
            res.writeHead(200, {"Content-Type":mime[ext]});
            res.end(data);
        }
        else{
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("There is no such file...")
            console.log(error);
        }
    });
}

function processNotStatic(req, res) {
  console.log(req.url);
  if (req.method === 'POST') {
    console.log("Inside POST REQUEST");
    var data = "";
    req.on('data', function(chunk){
      //do something when we start receiving data
      data += chunk;
    });
    req.on('end', function(){
      console.log("request ended!");
      res.end(data.toString());
    });
  }

  if (req.method === 'GET') {
    res.writeHead(200);
    res.write("<input>");
    res.end();
  }
}
