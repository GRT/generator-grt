'use strict'; /* jshint -W097 */

module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	var pushState = require('grunt-connect-pushstate/lib/utils').pushState;


	var appConfig = {
		app:  'app',
		dist: 'dist'
	};
	// Define the configuration for all the tasks
	grunt.initConfig({
		// Project settings
		yeoman: appConfig,

        concat: {
            options: {
                separator: ';'
            },
            app: {
                src: ['app/app.js','app/components/**/*.js'],
                dest: '.tmp/<%= appName %>.js'
            },
            vendor: {
                src: ['app/bower_components/**/*.min.js','.tmp/<%= appName %>.min.js'],
                dest: 'dist/<%= appName %>.min.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/<%= appName %>.min.js': ['.tmp/<%= appName %>.min.js']
                }
            }
        },

        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'yeoman.dist'
            }
        },

        usemin: {
            options: {
                dirs: ['dist']
            },
            html: ['**/*.html'],
            css: ['**/*.css']
        },
		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js: {
				files: ['app/**/*.js'],
				tasks: ['newer:jshint:all'],
				options: {
					livereload: false
				}
			},
			jsTest: {
				files: ['{**/}*.spec.js'],
				tasks: ['newer:jshint:test', 'karma']
			},
			less: {
				files: ['**/*.less'],
				tasks: ['less']
			},
			livereload: {
				options: {
					livereload: false
				},
				files: [
					'app/**/*.html',
					'.tmp/styles/{,*/}*.css'
				]
			}
		},
		open : {
			coverage: {
				path: './coverage/phantomjs/index.html'
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'Gruntfile.js',
					'./{**/}*.js',
					'!./{app,components}/**/*.spec.js'
				]
			},
			test: {
				options: {
					jshintrc: '.jshintrc-tests'
				},
				src: ['./{**/}*.spec.js']
			}
		},

		// Automatically inject Bower components into the app
		wiredep: {
			app: {
				src: ['app/index.html']
			}
		},

		// Automatically inject custom components into the app
        includeSource: {
            options: {
                basePath: './app'
            },
            dev: {
                files: {
                    'app/index.html': 'app/index.html'
                }
            }
        },

		// Clean
		clean: {
			dist: {
                options: {
                    force: true
                },
				files: [{
					dot: true,
					src: [
						'.tmp',
						'dist/{,*/}*',
						'!app/.git*'
					]
				}]
			},
			server: '.tmp/{,*/}*'
		},

		less: {
			options: {
				paths: [
					'app/bower_components',
					'app/components',
					'app/'

				]
			},
			dist: {
				files: {
					'.tmp/styles/app.css' : [
						'app/components/**/*.less',
						'app/app.less'
					]
				}
			}
		},

        cssmin: {
            minify: {
                src: '.tmp/styles/app.css',
                dest: 'dist/styles/app.min.css'
            }
        },

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},

		// The grunt server
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					middleware: function (connect) {
						return [
							connect.static('.tmp'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect.static(appConfig.app)
						];
					}
				}
			},
			test: {
				options: {
					port: 9001,
					middleware: function (connect) {
						return [
							connect.static('.tmp'),
							connect.static('test'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect.static(appConfig.app)
						];
					}
				}
			},

			dist: {
				options: {
					port: 9002,
					open: true,
					base: 'app'
				}
			}
		},

		// ng-annotate tries to make the code safe for minification automatically
		// by using the Angular long form for dependency injection.
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd: 'dist/<%= appName %>.js',
					src: ['*.js', '!oldieshim.js'],
					dest: 'dist/<%= appName %>.js'
				}]
			}
		},

		// Replace Google CDN references
		// THIS IS BROKEN FOR NOW: https://github.com/yeoman/generator-angular/issues/266
		cdnify: {
			dist: {
				html: ['app/*.html']
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'app',
					dest: 'dist',
                    src: [
                        '*.html',
						'*.{ico,png,txt,md}'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: 'app/images',
					src: ['generated/*']
				}]
			},
			styles: {
				files: [{
					expand: true,
					flatten:true,
					dest: 'dist/styles',
					src: ['.tmp/**/*.css']
				}]
			}
		},

		// Package all the html partials into a single javascript payload
		ngtemplates: {
			options: {
				// This should be the name of your apps angular module
				module: '<%= scriptAppName %>',
				htmlmin: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true
				},
				usemin: 'app/app.js'
			},
			app: {
				cwd: 'app',
				src: ['components/**/*.tmpl.html'],
				dest: '.tmp/templates.js'
			}

		},

		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		},

        protractor: {
            options: {
                configFile: 'protractor.conf.js'
            },
            chrome: {
                options: {
                    args: {
                        browser: 'chrome'
                    }
                }
            }
        },

        protractor_webdriver: {
            options: {
                'test': 'echo \'Error: no test specified\' && exit 1',
                path: 'node_modules/grunt-protractor-runner/node_modules/protractor/bin/',
                command: 'webdriver-manager start'
            }
        },

        shell: {
            wd_update: {
                command: 'node node_modules/grunt-protractor-runner/scripts/webdriver-manager-update'
            },
            rm_sample: {
                command: 'rm -rf app/components/welcome'
            }
        }
	});

	grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'less',
            'copy:styles',
            'wiredep',
            'includeSource:dev',
			'autoprefixer',
			'ngtemplates',
			'connect:livereload',
			'watch'
		]);
	});

	  grunt.registerTask('build', [
		  'clean:dist',
		  'less',
          'wiredep',
          'includeSource:dev',
          'copy:dist',
		  'ngAnnotate',
          'useminPrepare',
          'cssmin:minify',
          'concat',
          'uglify',
          'concat',
		  'usemin',
		  'ngtemplates',
		  'autoprefixer'
      ]);

	  grunt.registerTask('remove_sample', [
          'shell:rm_sample',
		  'clean:dist',
		  'less',
		  'wiredep',
		  'includeSource:dev'
	  ]);

    grunt.registerTask('coverage', 'open:coverage');


    grunt.registerTask('unittest', [
        'clean:server',
        'less',
        'copy:styles',
        'wiredep',
        'includeSource:dev',
        'autoprefixer',
        'ngtemplates',
		'karma'
	]);


	grunt.registerTask('e2e',[
        'clean:server',
        'less',
        'copy:styles',
        'wiredep',
        'includeSource:dev',
        'autoprefixer',
        'ngtemplates',
        'shell:wd_update',
		'protractor_webdriver',
		'connect:test',
		'protractor'
	]);

	grunt.registerTask('test',[
		'jshint:all',
        'e2e',
        'unittest'

	]);
};
