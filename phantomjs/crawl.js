var webpage = require('webpage');
var fs = require('fs');

var fsBase = 'C:/wamp/www/cours_angular/app/seo_snapshots';
var urlPrefix = 'http://localhost/cours_angular/app/';
var urlListFile = 'sitemap.txt';
var urlList;
var counter = 0;


function main() {
	urlList = fs.read(urlListFile).split('\n');
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
	var name = fsBase;
	var suffix = url.replace(new RegExp("^" + urlPrefix), '');

	if (suffix == '') {
		suffix = 'index.html';
	} else {
		suffix += '.html';
	}

	return name + '/' + suffix;
}

main();