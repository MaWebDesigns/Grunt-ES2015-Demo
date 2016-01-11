module.exports = function(grunt) {
	// Load in all dependencies
    "use strict";
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	
	// Save a log file of the grunt output - useful for htmlhint
	require('logfile-grunt')(grunt,  { filePath: './logs/grunt-task.log', clearLogFile: true });

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
		
		
		//**************************************************************************************************************************************
		// Browserify
		// Description: Creaates JavaScript modules as well as converts ES2015 Javascript into cross-browser friendly ES5 (traditional) 
		//              JavaScript.
		//
		// Output:  None, errors are logged in the log/grunt-task.log file 
		//
		browserify: {	
			dist: {
				  options: {
					debug: true,  
					transform: [
						["babelify", {
							"presets": ["es2015"]
                  }]
               ]
            },
			files: [{
						expand: true,
						cwd: 'php/public',
						src: [
							'**/*.es2015.js',        // just fine ES2015 js
							'!**/gdk/**/*',   		// ignore GDK files, not sure what they do.
							'!**/css/**/*',        	// Ignore css files
							'!**/SCCS/*'           	// Ignore bitkeeper file
							],
						dest: 'php/public/ES2015Demo/build',
						ext:'.js',
						extDot: 'first'
					}]
			}	
		},
		
		
		//**************************************************************************************************************************************
		// Watch
		// Description:  On a file save, it will perform mutiple commands depending on the type of file saved. 
		//
		// Output:  Depends on file that is saved.
		//
		// 
		watch: {
			html: {
				files: ['/php/tmpl/**/*.html', '/php/tmpl/**/*.php'],
				tasks: ['htmlhint']
			},
			css: {
				files: ['php/public/sass/**/*.scss', 'php/public/sass/**/*.sass', 'php/public/**/css/**/*.css', 'php/public/**/css/**/*.css.php'],
				tasks: ['buildcss']
			},
			js: {
				files: ['php/public/**/js/**/*.js'],
				tasks: ['jshint', 'babel', 'uglify']
			},
			es2015: 
			{
				files: ['php/public/**/*.es2015.js'],
				tasks: ['browserify']
			},
			images: {
				files: ['php/public/**/*.{png,jpg,gif}'],
				tasks: ['imagemin:single'],
				options: {
					spawn: false,			// don't spawn child processes
				}
			}
		} // end watch			
	});

	grunt.registerTask('default', ['imagemin']);
	grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);
	
	
}