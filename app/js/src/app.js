if (typeof String.prototype.startsWith != 'function') {
	// see below for better implementation!
	String.prototype.startsWith = function(str) {
		return this.indexOf(str) == 0;
	};
}

(function() {
	var cours_angular_config = get_cours_angular_config();
	angular.module('myUtilities', [])
/*	.directive("myInclude", function() {
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
*/
	var app = angular.module('angular_cours_app',
		[ 'ngRoute', 'myLayout', 'myServices', 'myUtilities' ]);

	app.directive('onFinishRender', ['$timeout', function($timeout) {
		return {
			restrict: 'A',
			link: function($scope, element, attr) {
				if ($scope.$last === true) {
					$timeout(function() {
						$scope.$emit(attr.onFinishRender);
					});
				}
			}
		};
	}]);

	/*
	app.directive("myInclude", function() {
		return {
			restrict: 'AE',
			scope: {
				src: '=',
				myInclude: '='
			},
			controller: ['$scope', '$http', '$sce', function($scope, $http, $sce) {
				console.log($scope);
				$http.get($scope.src)
					.success(function(data) {
						$scope.include_result = $sce.trustAsHtml(data);
					})
					.error(function() {
						$scope.include_result = $sce.trustAsHtml('<h1>Le cours demandé n\'a pas été touvé</h1>');
					});
			}],
			template: '<div ng-bind-html="include_result"></div>'
		};
	});
	*/

	app.controller('MyAppController',
		['$scope', '$http', '$location', '$anchorScroll', '$timeout',
		'LessonService',
	function($scope, $http, $location, $anchorScroll, $timeout, LessonService) {
		$scope.title = '';
		$scope.lesson_desc = {};
		$scope.lesson_list = LessonService.query();
		$scope.chapter_previous = undefined;
		$scope.chapter_next = undefined;
		$scope.breadcrumb = undefined;
		$scope.hash = { 'cours': 'Cours' };
		$scope.location = $location;
		$scope.now = new Date();
		$scope.window = window;

		$scope.update_breadcrumb = function() {
			$scope.breadcrumb = $location.path().split('/').slice(1);
		}

		$scope.update_hash = function(lesson_desc) {
			for (var i = 0; i < lesson_desc.content.length; i++) {
				$scope.hash[lesson_desc.content[i].path] = lesson_desc.content[i].title;
			}
			$scope.hash[lesson_desc.path] = lesson_desc.title;
		}

		$scope.$on('$routeChangeStart', function(next, current) {
			//console.log('$routeChangeStart');
			$scope.update_breadcrumb();
			//console.log($scope.location);
		});

		$scope.breadcrumb_href = function(index) {
			return $scope.url('/' + $scope.breadcrumb.slice(0, index + 1).join('/'));
		};

		$scope.$on('fix-menu', function() {
			fixXsMenu();
		});

		$scope.scrollTop = function() {
			$(window).scrollTop(0);
		};

		$scope.url = function(url) {
			return '#' + cours_angular_config.hashPrefix + url;
		}
	}]);

	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider
			.html5Mode(cours_angular_config.html5Mode)
			.hashPrefix(cours_angular_config.hashPrefix);

		$routeProvider
			.when('/', {
				templateUrl: 'partials/cover.html'
			})
			.when('/cours', {
				templateUrl: 'partials/lesson_list.html'
			})
			.when('/cours/:lesson', {
				templateUrl: 'partials/chapter_list.html',
				controller: 'ChapterListController'
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