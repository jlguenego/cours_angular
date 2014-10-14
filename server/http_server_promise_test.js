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
var server = http.createServer(function(req, res) {
	var done = finalhandler(req, res);

	var delay = 0;

	if (req.url.match(/^.*(png|jpg)$/)) {
		delay = 000;
	}

	console.log(req.url);
	console.log('delay=', delay);

	setTimeout(function() {
		serve(req, res, function onNext(err) {
			if (err) {
				return done(err);
			}
			index(req, res, done);
		});
	}, delay);

});

// Listen
var port = 8001;
server.listen(port);

console.log('Server started on port ' + port);


