(function() {
	var app = angular.module('myApp', [ 'localization' ]);

	app.controller('MyController', ['$scope', function($scope) {
		$scope.date = new Date();
	}]);
})();