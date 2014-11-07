function setSidebarHeight() {
	var winHeight = $(window).height();
	var height = winHeight - 88;

	var winBottom = $(window).scrollTop() + winHeight;

	var footerPos = $('footer').offset().top;
	if (winBottom > footerPos) {
		// The footer is on the screen
		height -= winBottom - footerPos
	}

	$('.my-sidebar').height(height);
}

function fixXsMenu() {
	$('header ul a:not(.dropdown-toogle)').click(function() {
		if ($('#menu-xs-button').is(':visible')) {
			$('#menu-xs-button').click();
		}
	});
}

function fixHeaderHeight() {
	var height = $('.header_breadcrumb').height() + cours_angular_config.css.headerNavbarHeight;

	console.log($('.container-fluid'));

	$('.container-fluid').css('padding-top', height + 'px');
}

(function() {
	$(window).resize(function() {
		setSidebarHeight();
		fixHeaderHeight();
	});
	$(window).scroll(setSidebarHeight);
})();