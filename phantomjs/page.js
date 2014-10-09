var page = require('webpage').create();
page.open('http://localhost:80/cours_angular/app', function() {
	page.render('js.png');
	phantom.exit();
});