(function() {
	var app = angular.module('jlgLocalization', [ 'ngLocale', 'ngResource' ]);

	app.service('jlgI18NService', ['$locale', '$resource', '$rootScope',
		function JLGI18NService($locale, $resource, $rootScope) {
			var self = this;

			var i18nRes = $resource('i18n/:locale.json');
			var localeRes = $resource('i18n/locale/locale_:locale.json');

			this.refresh = function() {
				this.translation = i18nRes.get({locale: $locale.id});

				var newLocale = localeRes.get({locale: $locale.id}, function(newLocale) {
					for (var property in newLocale) {
						if ($locale.hasOwnProperty(property)) {
							$locale[property] = newLocale[property];
						}
					}
				});
			};

			this.refresh();
		}
	]);

	app.filter('i18n', ['jlgI18NService', function(jlgI18NService) {
		return function(text) {
			console.log('arguments=', arguments);
			console.log('arguments.length=', arguments.length);

			var result = text;
			var args = arguments;
			var translation = jlgI18NService.translation;
			if (translation.hasOwnProperty(text)) {
				result = translation[text];
			}

			var pluralization = function(object, index, text) {
				if (typeof object == 'object') {
					console.log('is object');
					if (object.hasOwnProperty(args[index])) {
						object = object[args[index]];
						return pluralization(object, index + 1, text);
					}
					return pluralization(object['default'], index + 1, text);
				} else {
					return object;
				}
			}

			console.log('about pluraliza');
			result = pluralization(result, 1, text);
			console.log('after pluraliza');
			console.log('result=', result);
			var m = result.match(/\[\[.*?\]\]/g);
			var matchNbr = 0;
			if (m) {
				matchNbr = m.length;
			}
			console.log('match=', m);
			var start = arguments.length - matchNbr;

			for (var i = start; i < arguments.length; i++) {
				result = result.replace(/\[\[.*?\]\]/, arguments[i]);
			}
			console.log('result=', result);
			return result;
		}
	}]);
})();