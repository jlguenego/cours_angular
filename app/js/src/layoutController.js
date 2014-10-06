(function() {
	var app = angular.module('myLayout', []);

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

	app.controller('ChapterListController', ['$scope', '$http', '$routeParams', 'LessonService',
		function($scope, $http, $routeParams, LessonService) {
			$scope.map = LessonService.get({ name: $routeParams.lesson });
		}
	]);

	app.controller('ChapterController', ['$scope', '$http', '$routeParams', 'LessonService',
		function($scope, $http, $routeParams, LessonService) {
			$scope.chapterPath = 'data/' + $routeParams.lesson + '/' + $routeParams.chapter + '.html';

			$scope.map = LessonService.get({ name: $routeParams.lesson }, function(map) {
				var content_path = $scope.map.content.map(function(x) {return x.path;});
				var parent_breadcrumb = $scope.breadcrumb.slice(0);

				var current = parent_breadcrumb.pop();
				var index = content_path.indexOf(current);

				$scope.chapter_previous = undefined;
				if (index > 0) {
					var tmp = parent_breadcrumb.slice(0);
					tmp.push(content_path[index - 1]);
					$scope.chapter_previous = '#/' + tmp.join('/');
				}

				$scope.chapter_next = undefined;
				if (index < content_path.length - 1) {
					var tmp = parent_breadcrumb.slice(0);
					tmp.push(content_path[index + 1]);
					$scope.chapter_next = '#/' + tmp.join('/');
				}
			});
		}
	]);
})();