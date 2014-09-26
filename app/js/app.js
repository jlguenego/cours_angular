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
					console.log('fail');
					scope.loadFailed = true;
				});
				scope.$on("$includeContentLoaded", function(event, args){
					console.log('loaded');
					scope.loadFailed = false;
				});
				console.log(scope);
			},
			template: "<div ng-include='myInclude || src'></div><div ng-show='loadFailed' ng-transclude/>"
		};
	});

	var app = angular.module('angular_cours_app', [ 'ngRoute', 'my_layout', 'myUtilities' ]);
	var scope;

	app.controller('MyAppController', ['$scope','$http', function($scope, $http) {
		$scope.now = new Date();
		scope = $scope;

		$scope.update_breadcrumb = function() {
			$scope.breadcrumb = window.location.hash.split('/').slice(1);
		}
		$scope.breadcrumb_href = function(index) {
			return '#/' + $scope.breadcrumb.slice(0, index + 1).join('/');
		};
		console.log($scope.breadcrumb);

		$http.get('data/map.json')
			.success(function(data) {
				$scope.map = data;
			})
			.error(function() {
				alert('Cannot find map...');
			});
	}]);

	app.config(['$routeProvider', function($routeProvider) {
			$routeProvider
				.when('/cours_angularjs/:chapter', {
					templateUrl: 'partials/chapter.html',
					controller: 'ChapterController'
				})
				.otherwise({
					redirectTo: '/cours_angularjs/chapter0'
				});
	}]);


	$(window).resize(setSidebarHeight);
	$(window).scroll(setSidebarHeight);
})();