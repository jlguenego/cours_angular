var fs = require('fs');
var path = require('path');

var pagedown = require('pagedown');
var converter = new pagedown.Converter();

var lessonDir = path.normalize(__dirname + '/../app/data');

var runPrettifyStr =
	'<script src="bower_components/google-code-prettify/bin/run_prettify.min.js"></script>';

function main() {
	convertFilesInDir(lessonDir);
}

function convertFilesInDir(dirname) {
	var files = fs.readdirSync(dirname);
	files.forEach(function(fname) {
		var fpath = path.normalize(dirname + '/' + fname);
		if (fs.lstatSync(fpath).isDirectory()) {
			convertFilesInDir(fpath);
		} else if (fname.match(/^.*\.md$/)) {
			convertFile(fpath);
		}
	});
}

function convertFile(fpath) {
	var content = fs.readFileSync(fpath).toString();
	console.log(content);
}

main();