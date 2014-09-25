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

(function() {
	var app = angular.module('angular_cours_app', [ 'my_layout' ]);

	app.controller('MyAppController', ['$scope','$http', function($scope, $http) {
		$scope.now = new Date();

		$http.get('data/map.json')
			.success(function(data) {
				$scope.map = data;
			})
			.error(function() {
				alert('Cannot find map...');
			});
	}]);
	$(window).resize(setSidebarHeight);

	$(window).scroll(setSidebarHeight);
})();