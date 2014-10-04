module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				sourceMap: true,
				sourceMapName: 'app/js/<%= pkg.name %>.min.map'
			},
			build: {
				src: 'app/js/src/**/*.js',
				dest: 'app/js/<%= pkg.name %>.min.js'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);

};