var express = require('express');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var serveIndex = require('serve-index');

var app = express();
var rootDir = path.normalize(__dirname + '/..');

console.log('rootDir=' + rootDir);

function sendWebApp(request, response, next) {
	response.sendFile(rootDir + '/app/index.html');
}

//app.use(serveIndex(rootDir));


app.get('/app', sendWebApp);

app.get('/app/*', function(request, response, next) {
	console.log('case /app/*');
	var filePath = rootDir + request.url;
	console.log('url=' + request.url);
	console.log('filePath=' + filePath);

	if (fs.existsSync(filePath)) {
		console.log('file exists');
		response.type(mime.lookup(filePath));
		response.sendFile(filePath);
	} else {
		sendWebApp();
	}
});


function defaultCallback(request, response, next) {
	console.log('case *');
	var filePath = rootDir + request.url;
	console.log('url=' + request.url);
	console.log('filePath=' + filePath);

	if (!fs.existsSync(filePath)) {
		response.sendFile(rootDir + '/server/not_found.html');
		return;
	}

	var stat = fs.statSync(filePath);
	if (stat.isDirectory()) {
		console.log('is dir');
		if (fs.existsSync(path.normalize(filePath + '/index.html'))) {;
			request.url = path.normalize(request.url + '/index.html');
			defaultCallback(request, response, next);
		} else {
			response.c
		}
		return;
	}

	console.log('file exists');
	response.type(mime.lookup(filePath));
	response.sendFile(filePath);
}

app.get('*', defaultCallback);

var server = app.listen(8080, function() {
	console.log('Listening on port %d', server.address().port);
});