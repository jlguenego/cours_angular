(function() {
	var app = angular.module('my_layout', []);

	app.directive('myHeader', function() {
		return {
			restrict: 'E',
			templateUrl: 'partials/my_header.html'
		};
	});

	app.directive('mySidebar', function() {
		return {
			restrict: 'E',
			templateUrl: 'partials/my_sidebar.html'
		};
	});

	app.directive('myContent', function() {
		return {
			restrict: 'E',
			templateUrl: 'partials/my_content.html'
		};
	});

	app.directive('myFooter', function() {
		return {
			restrict: 'E',
			templateUrl: 'partials/my_footer.html'
		};
	});

	app.directive('myButtonNav', function() {
		return {
			restrict: 'E',
			templateUrl: 'partials/my_button_nav.html'
		};
	});

	app.controller('LessonListController', ['$scope', '$http', '$routeParams',
		function($scope, $http, $routeParams) {
			$scope.getData('data/cours.json');
		}
	]);

	app.controller('ChapterListController', ['$scope', '$http', '$routeParams',
		function($scope, $http, $routeParams) {
			$scope.getData('data/' + $routeParams.lesson + '.json');
		}
	]);

	app.controller('ChapterController', ['$scope', '$http', '$routeParams',
		function($scope, $http, $routeParams) {
			$scope.chapterPath = 'data/' + $routeParams.lesson + '/' + $routeParams.chapter + '.html';

			$scope.getData('data/' + $routeParams.lesson + '.json');

			//$scope.scrollTo($scope.location.path(), $scope.location.hash());
		}
	]);
})();