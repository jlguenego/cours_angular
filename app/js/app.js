if (typeof String.prototype.startsWith != 'function') {
	// see below for better implementation!
	String.prototype.startsWith = function(str) {
		return this.indexOf(str) == 0;
	};
}

function build_hash(data) {
	var result = {};
	for (var i = 0; i < data.content.length; i++) {
		result[data.content[i].path] = data.content[i].title;
	}
	result[data.path] = data.title;
	return result;
}

(function() {
	angular.module('myUtilities', [])
	.directive("myInclude", function() {
		return {
			restrict: 'CAE',
			scope: {
				src: '=',
				myInclude: '='
			},
			transclude: true,
			link: function(scope, iElement, iAttrs, controller) {
				scope.loadFailed = true;
				// Code not stable because $includeContentError does not exists
				// in AngularJS 1.2
				scope.$on("$includeContentError", function(event, args){
					scope.loadFailed = true;
				});
				scope.$on("$includeContentLoaded", function(event, args){
					scope.loadFailed = false;
				});
			},
			template: "<div ng-include='myInclude || src'></div><div ng-show='loadFailed' ng-transclude/>"
		};
	});

	var app = angular.module('angular_cours_app', [ 'ngRoute', 'my_layout', 'myUtilities' ]);
	var scope;

	app.directive('onFinishRender', ['$timeout', function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attr) {
				if (scope.$last === true) {
					$timeout(function() {
						scope.$emit(attr.onFinishRender);
					});
				}
			}
		};
	}]);

	app.controller('MyAppController', ['$scope','$http', '$location', function($scope, $http, $location) {
		console.log('location=');
		console.log($location);
		$scope.update_breadcrumb = function() {
			$scope.breadcrumb = window.location.hash.split('/').slice(1);
			$scope.path = '/' + $scope.breadcrumb.join('/');
			console.log($scope.path);
		}

		$scope.manage_nav_buttons = function() {
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
		};

		$scope.$on('$routeChangeStart', function(next, current) {
			$scope.update_breadcrumb();
		});

		$scope.getData = function(url) {
			$scope.map = {};
			$http.get(url)
				.success(function(data) {
					$scope.map = data;
					$scope.hash = build_hash(data);
					$scope.manage_nav_buttons();
				})
				.error(function() {
					alert('Cannot find "' + url + '"...');
				});
		};

		$scope.now = new Date();
		scope = $scope;
		$scope.window = window;

		$scope.breadcrumb_href = function(index) {
			return '#/' + $scope.breadcrumb.slice(0, index + 1).join('/');
		};

		$scope.$on('fix-menu', function() {
			fixXsMenu();
		});

		$http.get('data/cours.json')
			.success(function(data) {
				$scope.cours = data;
			})
			.error(function() {
				alert('Cannot find cours...');
			});
	}]);

	app.config(['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'partials/cover.html'
				})
				.when('/cours', {
					templateUrl: 'partials/lesson_list.html',
					controller: 'LessonController'
				})
				.when('/cours/:lesson', {
					templateUrl: 'partials/chapter_list.html',
					controller: 'ChapterController'
				})
				.when('/cours/:lesson/:chapter', {
					templateUrl: 'partials/lesson_content.html',
					controller: 'ChapterController'
				})
				.otherwise({
					redirectTo: '/'
				});
	}]);
})();