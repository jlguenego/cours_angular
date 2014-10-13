#!/usr/bin/env node
//	Create the sitemap.txt, containing all the urls of the application


String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
var fs = require('fs');

var seoFile = __dirname + '/../app/seo_snapshots/sitemap.txt';
var dataPath = __dirname + '/../app/data';
var topJson = require(dataPath + '/lesson_list.json');

function main() {
	fs.writeFileSync(seoFile, '');

	// Write index.html
	writeUrl('');
	// Write "cours" page
	writeUrl(topJson.path);
	topJson.content.forEach(function(item) {
		handleItem(topJson.path, item);
	});
}

function writeUrl(path) {
	var slash = '/';
	if (process.env.baseUrl.endsWith('/')) {
		slash = '';
	}
	var url = process.env.baseUrl + slash + path;
	console.log('Writing: ' + url);
	fs.appendFileSync(seoFile, url + '\n');
}

function handleItem(prefix, item) {
	writeUrl(prefix + '/' + item.path)

	if (item.file) {
		var json = require(dataPath + '/' + item.file);
		json.content.forEach(function(subitem) {
			handleItem(prefix + '/' + json.path, subitem);
		});
	}
}

main();