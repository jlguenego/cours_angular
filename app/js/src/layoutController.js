(function() {
	var app = angular.module('myLayout', ['ngResource']);

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

	app.directive('subChapter', function() {
		return {
			restrict: 'E',
			link: function(scope, element, attr, ctrl) {
				scope.anchor = attr.anchor;
			},
			transclude: true,
			template: '<div id="{{anchor}}" class="anchor"></div><h2 ng-transclude/>'
		};
	});

	app.directive('comments', function() {
		return {
			restrict: 'E',
			templateUrl: 'partials/comments.html',
			controller: ['$scope', '$http', function($scope, $http) {
				$scope.comments = [];

				if (!$scope.config.showComment) {
					return;
				}

				var chapterPath = $scope.breadcrumb.slice(1).join('/');

				$http
					.get('data/comments/' + chapterPath + '.json')
					.success(function(data) {
						$scope.comments = data;
					});
			}]
		};
	});

	app.directive('comment', function(){
		return {
			restrict: 'E',
			templateUrl: 'partials/comment.html',
			controller: function() {
				this.getRange = function(nbr) {
					nbr = nbr || 0;
					return new Array(nbr);
				};
			},
			controllerAs: 'commentCtrl'
		};
	});

	app.directive('commentForm', function(){
		return {
			restrict: 'E',
			templateUrl: 'partials/comment_form.html',
			controller: ['$scope', function($scope) {
				$scope.comment = {};

				this.addComment = function() {
					$scope.comments.push($scope.comment);
					$scope.comment = {};
				};
			}],
			controllerAs: 'addCommentCtrl'
		};
	});

	app.controller('SitemapController', ['$scope', '$resource',
		function($scope, $resource) {
			$scope.sitemap = $resource('sitemap.json').get();
			console.log('$scope.sitemap=', $scope.sitemap);
		}
	]);

	app.controller('ChapterListController', ['$scope', '$http', '$routeParams', 'LessonService',
		function($scope, $http, $routeParams, LessonService) {
			$scope.lesson_desc = LessonService.get({ name: $routeParams.lesson }, function(lesson_desc) {
				$scope.update_hash(lesson_desc);
			});
		}
	]);

	app.controller('ChapterController', ['$scope', '$http', '$routeParams', 'LessonService',
		function($scope, $http, $routeParams, LessonService) {
			$scope.chapter = {};
			$scope.chapterPath = '';

			$scope.update_nav_button = function(lesson_desc) {
				var content_path = lesson_desc.content.map(function(x) {return x.path;});
				var parent_breadcrumb = $scope.breadcrumb.slice(0);

				var current = parent_breadcrumb.pop();
				var index = content_path.indexOf(current);

				$scope.currentChapter = lesson_desc.content[index];

				$scope.chapter_previous = undefined;
				if (index > 0) {
					var tmp = parent_breadcrumb.slice(0);
					tmp.push(content_path[index - 1]);
					$scope.chapter_previous = '/' + tmp.join('/');
				}

				$scope.chapter_next = undefined;
				if (index < content_path.length - 1) {
					var tmp = parent_breadcrumb.slice(0);
					tmp.push(content_path[index + 1]);
					$scope.chapter_next = '/' + tmp.join('/');
				}
			};

			$scope.lesson_desc = LessonService.get({ name: $routeParams.lesson }, function(lesson_desc) {
				$scope.update_hash(lesson_desc);
				$scope.update_nav_button(lesson_desc);

				var type = $scope.currentChapter.type || 'md';
				$scope.chapterPath = 'data/' + $routeParams.lesson + '/' + $routeParams.chapter + '.' + type;
			});
		}
	]);
})();