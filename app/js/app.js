(function() {
	var app = angular.module('angular_cours_app', [ 'my_layout' ]);

	app.controller('MyAppController', ['$scope', function($scope) {
		$scope.now = new Date();
	}]);
})();