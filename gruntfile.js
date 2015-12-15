module.exports = function(grunt) {
	// Load in all dependencies
    "use strict";
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	
	// Save a log file of the grunt output - useful for htmlhint
	require('logfile-grunt')(grunt,  { filePath: './logs/grunt-task.log', clearLogFile: true });

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
		
		//**************************************************************************************************************************************
		// HTML Hint 
		// Description:  check HTML and PhP for common validation and standard issues set in the Options section.
		//
		// Output:  None, errors are logged in the log/grunt-task.log file 
		//
		htmlhint: {
            build: {
                options: {
                    'tag-pair': true,                    // Force tags to have a closing pair
                    'tagname-lowercase': true,           // Force tags to be lowercase
                    'attr-lowercase': true,              // Force attribute names to be lowercase e.g. <div id="header"> is invalid
                    'attr-value-double-quotes': true,    // Force attributes to have double quotes rather than single
                    'doctype-first': false,              // Force the DOCTYPE declaration to come first in the document 
                    'spec-char-escape': false,           // Force special characters to be escaped - Php vars cause issues for now.
                    'id-unique': true,                   // Prevent using the same ID multiple times in a document
                    'head-script-disabled': true,        // Prevent script tags being loaded in the head for performance reasons
                    'style-disabled': true,              // Prevent style tags. CSS should be loaded through 
					"inline-style-disabled": true,       // Prevent inline styles
					"space-tab-mixed-disabled": "space", // Spaces for indentation, not tabs
					"attr-no-duplication" : true 		 // An attribute cannot be used twice in same element.
                },
                src: ['code/php/**/*.html',
				      'code/php/**/*.php',
					  '!**/SCCS/*'
					  ]
            }
        },
		
		
		//**************************************************************************************************************************************
		// JS Hint 
		// Description: Check JavaScript and JQuery for common validation and standard issues set in the Options section.
		//
		// Output:  None, errors are logged in the log/grunt-task.log file 
		//
		jshint: {
			build: {
				options: {
					globals: {
						'jQuery':  	true,		// Allow the global variable JQuery
						'$':       	false		// do not override the $ global variable.
					},
					'browser':		true,		// Allows for browser globals like document, navigator, etc
					'jquery': 		true,		// Allow for jQuery globals
					'curly' : 		true,		// Require curly braces around blocks/loops
					'freeze': 		true,		// Prohibit overwriting of native objects such as arrays, date, etc
					'latedef': 		true,		// Prohibit use of variables before they are defined
					'nonbsp': 		true,		// Warn about non-breaking whitespace characters
					'undef': 		true,		// Warn about the use of undeclared variables
					'unused': 		true		// Warn about variables that are defined, but unused.  
				},
				src: [ 	'php/public/**/*.js',
						'!**/*.min.js', 		// Ignore files that have been minimized,
						'!**/jquery.*', 		// Ignore JQuery libraries
						'!**/DEFAULT/**/*',     // DEFAULT has a lot of errors, ignore for now
						'!**/gdk/**/*',   		// ignore GDK files, not sure what they do.
						'!**/css/**/*',        	// Ignore css files
					    '!**/SCCS/*'           	// Ignore bitkeeper file
					]	
				
			}
		},
		
		browserify: {	
			dist: {
				  options: {
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
						dest: 'php/public',
						ext:'.js',
						extDot: 'first'
					}]
			}	
		},
		
		//**************************************************************************************************************************************
		// Uglify
		// Description:  Minimizes and consolidates JavaScript files into smaller combined files (per recipie)
		//
		// Output: A minimized Javascript file with a .min.js extention saved to the build/public directories
		//
		uglify: {
			min_a: {
				files: [{
					expand: true,
					cwd: 'php/public',
					src: [
						'**/*.js',
						'!**/*.es2015.js',      // ignore ES2015 scripts
						'!**/gdk/**/*',   		// ignore GDK files, not sure what they do.
						'!**/css/**/*',        	// Ignore css files
						'!**/SCCS/*'           	// Ignore bitkeeper file
						],
					dest: 'build/public/js/',
					ext:'.min.js',
					extDot: 'first'
				}]
			},
			options: {
				sourceMap: 					true,
				sourceMapIncludeSources:	true,
				sourceMapUrl: 'build/js'
			}
		},
		
		//**************************************************************************************************************************************
		// Saas
		// Description:  Converts SASS code into CSS.  
		//
		// Output:  CSS code in the php/public/css folder
		//
		// 
		sass: {
			build: {
				files: [{
					expand: true,
					cwd: 'php/public',
					src: [
						'**/*.scss', 
						'**/*.sass',
						'!**/SCCS/*',
						'!**/js/**/*',        	// Ignore js files
						],
					dest: 'php/public',
					ext: '.css'
				}]
			},
			options: {
				trace: 			true,
				lineNumbers: 	true, 
			}
		},
		
		//**************************************************************************************************************************************
		// Cssc
		// Description:  Searches CSS code and consolidates CSS rules and media-queries.  
		//
		// Output:  CSS code in the build/public/css/clean/ folder
		//
		// 
		cssc: {
			build: {
				options: {
					debugInfo: 					true,
					consolidateViaDeclarations: true,
					consolidateViaSelectors:    false,  // This throws and error for some reason
					consolidateMediaQueries:   	true
				},
				files: [{
					expand: true,
					cwd: 'php/public/',
					src: [
						'**/css/**/*.css', 
						'**/css/**/*.css.php', 
						'!**/DEFAULT/**/*',     // Some DEFAULT files have CSS errors that cause this task to fail
						'!**/js/**/*',        	// Ignore js files
						'!**/SCCS/*',
						'**/DEFAULT/css/globalstylesmain.css',
						'**/DEFAULT/css/jquery.qtip2.1.1.css',
						'**/DEFAULT/css/colorbox.css',
						'**/DEFAULT/css/staticmain.css',
						'**/DEFAULT/css/playmain.css',
						'**/DEFAULT/css/pollsandsurverysmain.css', 
						'**/DEFAULT/css/OriginalStylesMain.css', 
						'**/DEFAULT/css/tablesorter.css',
						'**/DEFAULT/css/jquery-ui-1.9.2/jquery-ui-1.9.2.min.css', 
						'**/DEFAULT/css/jquery.tooltip.css',
						'**/DEFAULT/css/ilottery/*.css'
						],
					dest: 'build/public/css/clean/',
				}]
			}
		},

		//**************************************************************************************************************************************
		// Cssmin
		// Description:  Takes the CSS that has been cleaned by CSSC and consolidates and minimizes it
		//
		// Output:  CSS code in the build/public/css/min folder
		//
		// 
		cssmin: {
			MaineGlobal: 
			{
				options: {
					banner: '/* Minified on <%= grunt.template.today("yyyy-mm-dd hh:MM:ss")%> by GruntJS-cssmin */',
					sourceMap:  true,
					advanced: true,
					mediaMerging: true,   // Merge Media Queries
					
				},
				files: { 
						'build/public/css/min/MaineLottery/final.min.css' : [
							'build/css/clean/MaineLottery/**/*.css', 
							'build/css/clean/MaineLottery/**/*.css.php', 
							'!build/css/clean/MaineLottery/**/images.css.php',
							'!**/js/**/*',        	// Ignore js files
							'!**/SCCS/*'
						],		
				}
			}
		},
		
		//**************************************************************************************************************************************
		// imagemin
		// Description:  Takes any PNG, GIF, or JPEG and compresses them into a new file
		//
		// Output:  Compressed images in the build/public/ folder
		//
		// 
		imagemin: {  
			options: {
				cache: false,
				optimizationLevel: 7  				// Optimization levels can go from 1-7, with 7 being the highest optimization. 
				// use: [pngquant(), mozjpeg(), gifsicle()] //  Use the special optimizers for each file.  
			}, 
			dist: {
				files: 
				[{
					expand: true,
					cwd: 'php/public/',
					src: [
						'**/*.{png,jpg,gif}',
						'!**/SCCS/*'
						],
					dest: 'build/public',
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