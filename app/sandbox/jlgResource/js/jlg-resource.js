(function() {
	var app = angular.module('jlgResource', [ 'ngResource' ]);

	app.service('jlgResourceService', ['$resource', function($resource) {
			return function(url) {
				var service = {};
				service.resource = $resource(url);
				console.log('url=', url);

				service.get = function(params, success, error) {
					// [{locale: $locale.id}, {locale: safeLocaleId}, {locale: 'en-us'}]
					if (typeof params == 'object' && !Array.isArray(params)) {
						return service.resource.get(params, success, error);
					}
					if (!Array.isArray(params)) {
						throw Error('params must be an object or an array.');
					}

					var result;
					var loop = function(i) {
						return function() {
							if (i < params.length) {
								result = service.resource.get(params[i], success, loop(i + 1));
							} else {
								if (error) {
									error();
								}
							}
						}
					}

					loop(0)();
					return result;
				}

				return service;
			}
		}
	]);

})();