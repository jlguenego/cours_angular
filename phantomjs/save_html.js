var page = require('webpage').create();
var system = require('system');
var fs = require('fs');

var fsBase = 'C:/wamp/www/cours_angular/app/seo_snapshots';
var urlPrefix = 'http://localhost/cours_angular/app/';

if (system.args.length === 1) {
	console.log('Usage: ' + system.args[0] + ' <some URL>');
	phantom.exit(1);
}

function getFilename(url) {
	var name = fsBase;
	var suffix = url.replace(new RegExp("^" + urlPrefix), '');

	if (suffix == '') {
		suffix = 'index.html';
	} else {
		suffix += '.html';
	}

	return name + '/' + suffix;
}

var url = system.args[1];
page.open(url, function () {
	page.evaluate(function(){});

	page.render(getFilename(url) + '.png');
	fs.write(getFilename(url), page.content, 'w');
	phantom.exit();
});