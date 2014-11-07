// index.html
// .htaccess

var fs = require('fs');
var config = require('../config_seo.json');

function main() {
	// <base href="/app/" />
	var profile = config.profile;

	var indexContent = fs.readFileSync(__dirname + '/../app/index.html').toString();
	indexContent = indexContent.replace(/<base href=".*?"/,
			'<base href="' + config.profiles[profile].base + '"');
	fs.writeFileSync(__dirname + '/../app/index.html', indexContent);

	var htaccessContent = fs.readFileSync(__dirname + '/../app/.htaccess.tmpl').toString();
	htaccessContent = htaccessContent.replace(/__BASE__/g,
			config.profiles[profile].base);
	fs.writeFileSync(__dirname + '/../app/.htaccess', htaccessContent);
}

main();