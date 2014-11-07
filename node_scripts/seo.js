// Wrap 3 scripts:
//	- create_sitemap.js: create the sitemap.txt
//	- export_sitemap.js: export the sitemap.txt to sitemap.xml in the root of the application
//	- crawl.js: generate the snapshots of the application


require('shelljs/global');
var path = require('path');

var config = require('../config_seo.json');
process.env.baseUrlExtraction = config.baseUrlExtraction;
process.env.baseUrlDestination = config.baseUrlDestination;
process.env.seoSnapshotDir = config.seoSnapshotDir;
process.env.cacheTime = config.cacheTime;


if (!process.env.baseUrlExtraction) {
	throw 'No base url for extraction defined';
}
if (!process.env.baseUrlDestination) {
	throw 'No base url for destination defined';
}
if (!process.env.seoSnapshotDir) {
	throw 'No snapshots dir defined';
}
if (!process.env.cacheTime) {
	throw 'No cache time defined';
}

// Creating sitemap
console.log('Creating sitemap...');
exec('node node_scripts/create_sitemap.js',
	function(code, output) {
// Exporting sitemap
		console.log('\nExporting sitemap...');
		exec('node node_scripts/export_sitemap.js',
			function(code, output) {
// Creating snapshots
				console.log('\nCreating snapshots...');
				exec('phantomjs node_scripts/phantom_crawl.js');
			}
		);
	}
);

