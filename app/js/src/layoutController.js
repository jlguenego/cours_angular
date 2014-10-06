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
			$scope.lesson_desc = LessonService.get({ name: $routeParams.lesson }, function(lesson_desc) {
				$scope.update_hash(lesson_desc);
			});
		}
	]);

	app.controller('ChapterController', ['$scope', '$http', '$routeParams', 'LessonService',
		function($scope, $http, $routeParams, LessonService) {
			$scope.update_nav_button = function(lesson_desc) {
				var content_path = lesson_desc.content.map(function(x) {return x.path;});
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
			};

			$scope.chapterPath = 'data/' + $routeParams.lesson + '/' + $routeParams.chapter + '.html';

			$scope.lesson_desc = LessonService.get({ name: $routeParams.lesson }, function(lesson_desc) {
				$scope.update_hash(lesson_desc);
				$scope.update_nav_button(lesson_desc);
			});
		}
	]);
})();