var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var serveIndex = require('serve-index')
var path = require('path');
var fs = require('fs');

var rootDir = path.normalize(__dirname + '/..');

var serve = serveStatic(rootDir, {'index': ['index.html', 'index.htm']});

// Serve directory indexes for public/ftp folder (with icons)
var index = serveIndex(rootDir, {'icons': true})

// Create server
var server = http.createServer(function(req, res){
	var done = finalhandler(req, res);

	urlRewrite(req);

	serve(req, res, function onNext(err) {
		if (err) {
			return done(err);
		}
		index(req, res, done);
	});
});

function urlRewrite(req) {
	console.log(req.url);

	if (req.url.match(/^\/app\/content\//)) {

		req.url = '/app/index.html';
	}
}

// Listen
server.listen(8080)


