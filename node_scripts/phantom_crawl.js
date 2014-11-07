#!/usr/bin/env phantomjs
// Generate all the snapshots foreach url inside the sitemap.txt

var webpage = require('webpage');
var fs = require('fs');
var system = require('system');

var urlListFile = phantom.libraryPath + '/../app/seo_snapshots/sitemap.txt';

function main() {
	var urlList = fs.read(urlListFile).split('\n');
	createSnapshot(urlList);
}

function createSnapshot(urlList) {
	var url = urlList.shift();
	if (!url) {
		phantom.exit();
		return;
	}
	console.log('Creating snapshot for: ' + url);
	var page = webpage.create();
	page.open(url, function () {
		page.evaluate(function(){});

		var path = getFilename(url);
		page.render(path + '.png');
		fs.write(path, page.content, 'w');
		console.log('Snapshot saved at: ' + path);
		createSnapshot(urlList);
	});
}

function getFilename(url) {
	var name = system.env.seoSnapshotDir;
	var suffix = url.replace(new RegExp("^" + system.env.baseUrlExtraction), '');

	if (suffix == '') {
		suffix = 'index.html';
	} else {
		suffix += '.html';
	}

	return name + '/' + suffix;
}

main();