(function() {
	var myServices = angular.module('myServices', ['ngResource']);

	myServices.factory('LessonList', ['$resource', function($resource){
		return $resource('data/lesson_list.json', {}, {
			query: { method: 'GET' }
		});
	}]);
})();