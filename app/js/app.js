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

/*
$(document).ready(function() {
	});
	*/

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


	function build_hash(data) {
		var result = {};
		for (var i = 0; i < data.content.length; i++) {
			result[data.content[i].path] = data.content[i].title;
		}
		result[data.path] = data.title;
		return result;
	}

	app.controller('MyAppController', ['$scope','$http', function($scope, $http) {
		$scope.now = new Date();
		scope = $scope;
		$scope.window = window;

		$scope.update_breadcrumb = function() {
			$scope.breadcrumb = window.location.hash.split('/').slice(1);

			var content_path = $scope.map.content.map(function(x) {return x.path;});
			var last = content_path.slice(0).pop();
			var index = content_path.indexOf(last);

			if (index > 0) {
				$scope.previous = 'data/' + content_path[index - 1] + '.html';
			}

			if (index < content_path.length) {
				$scope.next = 'data/' + content_path[index + 1] + '.html';
			}
		}

		$scope.breadcrumb_href = function(index) {
			return '#/' + $scope.breadcrumb.slice(0, index + 1).join('/');
		};

		$scope.$on('fix-menu', function() {
			fixXsMenu();
		});
/*
		$http.get('data/cours.json')
			.success(function(data) {
				$scope.cours = data;
			})
			.error(function() {
				alert('Cannot find map...');
			});

		$http.get('data/map.json')
			.success(function(data) {
				$scope.map = data;
				$scope.hash = build_hash(data);
			})
			.error(function() {
				alert('Cannot find map...');
			});
*/
	}]);

	app.config(['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'partials/cover.html'
				})
				.when('/cours_angularjs/:chapter', {
					templateUrl: 'partials/chapter.html',
					controller: 'ChapterController'
				})
				.otherwise({
					redirectTo: '/'
				});
	}]);


	$(window).resize(setSidebarHeight);
	$(window).scroll(setSidebarHeight);
})();