module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		uglify: {
			options: {
				sourceMap: true,
				sourceMapName: 'js.min.map'
			},
			build: {
				src: '*.js',
				dest: 'js.min.js'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);

};