#!/usr/bin/env node
// Create the sitemap.xml with the urls inside the sitemap.txt
// and place it to the rootdir of the application


var sm = require('sitemap');
var fs = require('fs');
var path = require('path');

var sitemapXml = path.normalize(__dirname + '/../app/sitemap.xml');
var sitemapTxt = path.normalize(__dirname + '/../app/seo_snapshots/sitemap.txt');

function main() {
	console.log('Creating sitemap.xml from ' + sitemapTxt);
	var urlList = fs.readFileSync(sitemapTxt).toString().split('\n');
	urlList.shift();

	var sitemap = sm.createSitemap ({
		hostname: process.env.baseUrlDestination,
		cacheTime: process.env.cacheTime
	});

	urlList.forEach(function(url) {
		url = url.replace(process.env.baseUrlExtraction, process.env.baseUrlDestination);
		sitemap.add({url: url});
	});

	sitemap.toXML(function(xml) {
		fs.writeFileSync(sitemapXml, xml);
		console.log('Exported to ' + sitemapXml);
	});
}

main();