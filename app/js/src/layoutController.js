(function() {
	var app = angular.module('myLayout', ['ngResource', 'ngSanitize', 'ngAnimate']);

	app.directive('markdown', ['$sce', function($sce) {
		return {
			restrict: 'ECA',
			link: function(scope, element, attr, ctrl) {
				var markdownConverter = new Showdown.converter();

				console.log('attr.markdown=', attr.markdown);
				if (attr.markdown) {
					console.log('attr.markdown=yes');
					scope.$watch(attr.markdown, function(newVal) {
						var html = newVal? $sce.trustAsHtml(markdownConverter.makeHtml(newVal)) : '';
						element.html(html);
					});
				} else {
					console.log('element.text()=', element.text());
					//var html = markdownConverter.makeHtml(element.text());
					//var value = $sce.trustAsHtml(html);
					//console.log('html=', html);
					//element.html(value);
				}
			}
		};
	}]);

	function isDefined(value){return typeof value !== 'undefined';}
	var mdIncludeDirective = ['$http', '$templateCache', '$anchorScroll', '$animate', '$sce',
					  function($http,   $templateCache,   $anchorScroll,   $animate,   $sce) {
		return {
			restrict: 'ECA',
			priority: 400,
			terminal: true,
			transclude: 'element',
			controller: angular.noop,
			compile: function(element, attr) {
				var srcExp = attr.ngInclude || attr.src,
				onloadExp = attr.onload || '',
				autoScrollExp = attr.autoscroll;


				return function(scope, $element, $attr, ctrl, $transclude) {
					var changeCounter = 0,
						currentScope,
						previousElement,
						currentElement;

					var cleanupLastIncludeContent = function() {
						if(previousElement) {
							previousElement.remove();
							previousElement = null;
						}
						if(currentScope) {
							currentScope.$destroy();
							currentScope = null;
						}
						if(currentElement) {
							$animate.leave(currentElement, function() {
								previousElement = null;
							});
							previousElement = currentElement;
							currentElement = null;
						}
					};

					scope.$watch($sce.parseAsResourceUrl(srcExp),
						function ngIncludeWatchAction(src) {
							var afterAnimation = function() {
								if (isDefined(autoScrollExp)
									&& (!autoScrollExp || scope.$eval(autoScrollExp))) {
									$anchorScroll();
								}
							};
							var thisChangeId = ++changeCounter;

							if (src) {
								$http.get(src, {cache: $templateCache})
									.success(function(response) {
										if (thisChangeId !== changeCounter) return;
										var newScope = scope.$new();
										ctrl.template = response;

										var clone = $transclude(newScope, function(clone) {
											cleanupLastIncludeContent();
											$animate.enter(clone, null, $element, afterAnimation);
										});

										currentScope = newScope;
										currentElement = clone;

										currentScope.$emit('$includeContentLoaded');
										scope.$eval(onloadExp);
									})
									.error(function() {
										if (thisChangeId !== changeCounter) return;
										var newScope = scope.$new();
										ctrl.template = 'Not found';

										var clone = $transclude(newScope, function(clone) {
											cleanupLastIncludeContent();
											$animate.enter(clone, null, $element, afterAnimation);
										});

										currentScope = newScope;
										currentElement = clone;

										currentScope.$emit('$includeContentFailed');
										scope.$eval(onloadExp);
									});

								scope.$emit('$includeContentRequested');
							} else {
								cleanupLastIncludeContent();
								ctrl.template = null;
							}
						}
					);
				};
			}
		};
	}];

	var mdIncludeFillContentDirective = ['$compile',
		function($compile) {
			return {
				restrict: 'ECA',
				priority: -400,
				require: 'mdInclude',
				link: function(scope, $element, $attr, ctrl) {
					var markdownConverter = new Showdown.converter();
					var html = markdownConverter.makeHtml(ctrl.template);
					$element.html(html);
					$element.find('pre').each(function(i, block) {
						var lang = $(this).find('code').attr('class');
						if (!lang) {
							return;
						}
						$(this).addClass('prettyprint lang-' + lang);
					});
					$element.append('<script src="bower_components/google-code-prettify/bin/run_prettify.min.js?"></script>');
					$compile($element.contents())(scope);
				}
			};
		}
	];

	app.directive({mdInclude: mdIncludeDirective})
		.directive({mdInclude: mdIncludeFillContentDirective});

	app.directive('escapeHtml', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attr, ctrl) {
				console.log('innerHTML=', element[0].innerHTML);
				element[0].innerHTML = element[0].innerHTML
						.replace(/</g, "&lt;")
						.replace(/-html/g, "html")
						.replace(/-\/html/g, "/html")
						.replace(/-head/g, "head")
						.replace(/-\/head/g, "/head")
						.replace(/-body/g, "body")
						.replace(/-\/body/g, "/body")
						.replace(/-script/g, "script")
						.replace(/-\/script/g, "/script");
				console.log(element[0].innerHTML);
			}
		};
	});

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
				var chapterPath = $scope.breadcrumb.slice(1).join('/');

				$http.get('data/comments/' + chapterPath + '.json')
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
			$scope.update_nav_button = function(lesson_desc) {
				var content_path = lesson_desc.content.map(function(x) {return x.path;});
				var parent_breadcrumb = $scope.breadcrumb.slice(0);

				var current = parent_breadcrumb.pop();
				var index = content_path.indexOf(current);

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

			$scope.chapterPath = 'data/' + $routeParams.lesson + '/' + $routeParams.chapter + '.md';

			$scope.lesson_desc = LessonService.get({ name: $routeParams.lesson }, function(lesson_desc) {
				$scope.update_hash(lesson_desc);
				$scope.update_nav_button(lesson_desc);
			});
		}
	]);
})();