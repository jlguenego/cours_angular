(function() {
	var myServices = angular.module('myServices', ['ngResource']);

	myServices.factory('LessonService', ['$resource', function($resource){
		return $resource('data/:name.json', {}, {
			query: { method: 'GET', params: { name: 'lesson_list' } }
		});
	}]);
})();