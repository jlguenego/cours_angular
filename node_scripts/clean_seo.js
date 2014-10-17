require('shelljs/global');
var path = require('path');
var fs = require('fs');

var rootdir = path.normalize(__dirname + '/..');
var createScriptPath = path.normalize(rootdir + '/node_scripts/create_sitemap.js');
var exportScriptPath = path.normalize(rootdir + '/node_scripts/export_sitemap.js');
var crawlScriptPath = path.normalize(rootdir + '/phantomjs/crawl.js');
var configFile = path.normalize(rootdir + '/node_scripts/config.json');

echo('Removing snapshots...');
rm('-rf', rootdir + '/app/seo_snapshots');

echo('Removing sitemap.xml...');
rm('-f', rootdir + '/app/sitemap.xml');

echo('Removing sitemap.json...');
rm('-f', rootdir + '/app/sitemap.json');