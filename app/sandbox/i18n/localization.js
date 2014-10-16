(function() {
	var app = angular.module('localization', [ 'ngLocale' ]);

	app.service('i18nFile', ['$http', '$locale', '$rootScope',
		function($http, $locale, $rootScope) {
			var mergeLocal = function(newLocale) {
				for (var property in newLocale) {
					if ($locale.hasOwnProperty(property)) {
						$locale[property] = newLocale[property];
					}
				}
			};

			var setTranslation = function(locale) {
				$http.get('i18n/' + locale + '.json')
					.success(function(data) {
						$rootScope.translation = data;
						console.log(data);
					})
					.error(function() {
						console.log('No translation change...');
					});
			}

			this.setLocale = function(locale) {
				$http.get('i18n/locale/locale_' + locale + '.json')
					.success(function(data) {
						mergeLocal(data);

						$rootScope.locale = $locale.id;
						setTranslation($locale.id);
					})
					.error(function() {
						console.log('No locale change...');
					});
			}
		}
	]);

	var rootScope = {};

	app.controller('I18nController', ['$rootScope', '$locale', 'i18nFile',
		function($rootScope, $locale, i18nFile) {
			$rootScope.locale = $locale.id;
			$rootScope.translation = {};
			$rootScope.$watch('translation', function(old, newval) {
				console.log('translation change');
			});

			rootScope = $rootScope;

			i18nFile.setLocale($locale.id);

			$rootScope.changeLocal = function(newLocaleId) {
				i18nFile.setLocale(newLocaleId);
			};
		}
	]);

	app.filter('i18n', ['$controller', function($controller) {
		$controller('I18nController');
		return function(text) {
			var translation = rootScope.translation;
			if (translation.hasOwnProperty(text)) {
				return translation[text];
			}
			return text;
		}
	}]);
})();