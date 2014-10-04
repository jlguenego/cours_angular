'use strict';

(function(undefined) {
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	describe('Controllers', function() {
		beforeEach(module('angular_cours_app'));

		beforeEach(function() {
			this.addMatchers({
				toBeEmpty: function() {
					var obj = this.actual;

					if (obj == null) {
						return true;
					}

					if (obj.length > 0) {
						return false;
					}

					if (obj.length === 0) {
						return true;
					}

					for (var key in obj) {
						if (hasOwnProperty.call(obj, key)) return false;
					}

					return true;
				},
				toBeObject: function() {
					return typeof this.actual === 'object';
				}
			});
		});

		describe('MyAppController ', function() {
			var ctrl = undefined;
			var scope = undefined;
			var rootScope = undefined;
			var location = undefined;
			var $httpBackend = undefined;

			beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $location) {
				$httpBackend = _$httpBackend_;
				$httpBackend.expectGET('data/cours.json')
					.respond({
						title: "Cours",
						path: "cours",
						content: [
							{
								title: "JavaScript",
								path: "javascript",
								file: "javascript.json",
								img: "js.png"
							},
							{
								title: "AngularJS",
								path: "angularjs",
								file: "angularjs.json",
								img: "angularjs.png"
							}
						]
					});
				rootScope = $rootScope;
				scope = $rootScope.$new();
				ctrl = $controller('MyAppController', {$scope: scope});
				location = $location;
			}));

			describe('Set default values', function() {
				it('should set $scope.now', function() {
					expect(scope.now).toBeDefined();
				});

				it('should set $scope.cours', function() {
					expect(scope.cours).toBeObject();
					expect(scope.cours).toBeEmpty();

					$httpBackend.flush();
					expect(scope.cours).toBeObject();
					expect(scope.cours).not.toBeEmpty();
					expect(scope.cours.title).toBe('Cours');
					expect(scope.cours.path).toBe('cours');
					expect(scope.cours.content.length).toEqual(2);
					expect(scope.cours.content[0].title).toBe('JavaScript');
					expect(scope.cours.content[0].path).toBe('javascript');
					expect(scope.cours.content[0].file).toBe('javascript.json');
					expect(scope.cours.content[0].img).toBe('js.png');
				});

				it('should set breadcrumbs', function() {
					var path = '/cours/angularjs/chapter1';

					expect(scope.breadcrumb).not.toBeDefined();

					location.path(path);
					scope.update_breadcrumb();

					expect(scope.breadcrumb).toEqual(path.split('/').splice(1));
				});

				it('should set $scope.map', function() {
					var path = '/cours/angularjs/chapter1';

					$httpBackend.flush();

					expect(scope.map).toBeObject();
					expect(scope.map).toBeEmpty();

					location.path(path);
					scope.update_breadcrumb();

					$httpBackend.expectGET('data/angularjs/chapter2.html')
						.respond({
							title: "AngularJS",
							path: "angularjs",
							img: "angularjs.png",
							content: [
								{
									title: "Introduction",
									path: "chapter0"
								},
								{
									title: "Chapter 1",
									path: "chapter1"
								},
								{
									title: "Chapter 2",
									path: "chapter2"
								},
								{
									title: "Chapter 12",
									path: "chapter12"
								}
							]
						});
					scope.getData('data/angularjs/chapter2.html');
					$httpBackend.flush();

					expect(scope.map).toBeObject();
					expect(scope.map).not.toBeEmpty();
					expect(scope.map.title).toBe('AngularJS');
					expect(scope.map.path).toBe('angularjs');
					expect(scope.map.img).toBe('angularjs.png');
					expect(scope.map.content.length).toEqual(4);
					expect(scope.map.content[0].title).toEqual('Introduction');
					expect(scope.map.content[0].path).toEqual('chapter0');
				});
			});
		});
	});
})();