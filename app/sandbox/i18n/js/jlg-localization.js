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
			console.log('typeof arguments=', typeof arguments);
			console.log('arguments.length=', arguments.length);

			var args = Array.prototype.slice.call(arguments, 1);
			console.log('args', args);


			var result = text;
			var translation = jlgI18NService.translation;
			if (translation.hasOwnProperty(text)) {
				result = translation[text];
			}

			var getKeys = function() {
				var res = [];
				for (var i = 0; i < Math.pow(2, args.length); i++) {
					var a = [];
					for (var j = 0; j < args.length; j++) {
						var isNotProvided = i&Math.pow(2, j);
						console.log('(' + i + ', ' + j + ')=' + isNotProvided);
						if (isNotProvided) {
							a.push('@');
						} else {
							a.push(args[j]);
						}
					}
					res.push(a.join('_'));
				}
				return res;
			}

			var selectedKey = Array.apply(null, Array(args.length))
								.map(function() { return '@' })
								.join('_');
			if (typeof result == 'object') {
				// Pluralization
				var keys = getKeys();
				console.log('keys=', keys);
				var found = false;
				for (var i = 0; i < keys.length; i++) {
					if (result.hasOwnProperty(keys[i])) {
						selectedKey = keys[i];
						result = result[selectedKey];
						found = true;
						break;
					}
				}
				if (!found) {
					result = text;
				}
			}

			var a = selectedKey.split('_');
			for (var i = 0; i < args.length; i++) {
				if (a[i] == '@') {
					result = result.replace(/\[\[.*?\]\]/, args[i]);
				}
			}

			console.log('result=', result);
			return result;
		}
	}]);
})();