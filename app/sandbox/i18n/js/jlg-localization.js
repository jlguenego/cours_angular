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
			var translation = jlgI18NService.translation;
			if (translation.hasOwnProperty(text)) {
				result = translation[text];
			}

			for (var i = 1; i < arguments.length; i++) {
				text = text.replace(/\[\[.*?\]\]/, arguments[i]);
			}

			return text;
		}
	}]);
})();