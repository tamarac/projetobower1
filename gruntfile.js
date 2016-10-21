 module.exports = function(grunt) {

	//config
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		
		//Sass
		sass: {   
			options: {
				sourceMap: true,
				outputStyle: 'compressed'
			},
	        dist: {
	            files: {
	                'public/css/style.min.css': 'assets/scss/main.scss'
	            }
	        }
	    },

	    jshint: {
	    	options: {
	    		reporter: require('jshint-stylish'),
	    		'curly': true,
	    		'newcap': true,
	    		'eqeqeq': true, 
	    		'undef': true,
	    		'devel': true,
	    		'debug': true,
	    		'globals': {
	    			'$': true,
	    			'jQuery': true,
	    			'document': true
	    	}
	    },
    	all: ['assets/js/main.js'],
    	prod: {
    		options: {	
	    		'devel': false,
	    		'debug': false,	  
	    	},
	    	files: {
	    		src: ['assets/js/main.js']
	    	}	  		
    	}
	    },

	    //Uglify
	    uglify:{
	    	my_files: {
	    		options: {
	    			sourceMap: true,
	    			sourceMapName: 'public/js/main.min.map',
	    			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        					'<%= grunt.template.today("yyyy-mm-dd") %> */'
	    		},
	    		files: {
	    			'public/js/main.min.js': 
	    			[
	    				'components/jquery/dist/jquery.js',
	    				'components/masonry/dist/masonry.pkgd.js',
	    				'assets/js/main.js'
	    			]
	    		}
	    	}
	    },

	    //Imagemin
	    imagemin: {
	    	my_images: {
	    		options: {
	    			progressive: true
	    		},
	    		files: [{
	    			expand: true,
	    			cwd: 'assets/img/',
	    			src: ['*.{png,jpg,gif}'],
	    			dest: 'public/img'
	    		}]
	    	}
	    },
    

	    // Watch
	    watch: {
	    	options: {
	    		livereload: true
	    	},
	    	sass: {
	    		files: 'assets/scss/*.scss',
	    		tasks: 'css'
	    	},
	    	sprite: {
	    		files: 'assets/img/sprite/*.png',
	    		tasks:'sprite'
	    	},
	    	js: {
	    		files: 'assets/js/main.js',
	    		tasks: 'js'
	    	}
	    },

	    //Connect
	    connect: {
	    	server: {
	    		options: {
	    			port: 9000,
	    			base: '.',
	    			hostname: 'localhost',
	    			livereload: true
	    		}
	    	}
	    },
 		sprite:{
	      	all: {
		        src: 'assets/img/sprites/*.png',
		        dest: 'public/img/sprite.png',
		        destCss: 'assets/scss/_sprites.scss',
		        cssFormat: 'scss',
		        cssTemplate: 'assets/scss/icons.mustache'
	    	}
    	},
     	jasmine: {
		    pivotal: {
		      src: 'assets/js/hello.js',
		      options: {
		        specs: 'spec/*Spec.js',
		      }
		    }
		},
		compress:{
			main: {
				options: {
					archive: 'project.zip'
				},
				files: [{
					src: ['index.html','public'],
					dest: '.'
				}]
			}
		}
	});

	//Load plugins
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-compress');

	//Tasks
	grunt.registerTask('css', ['sass']);
	grunt.registerTask('js', ['jshint:all', 'uglify']);
	grunt.registerTask('live', ['connect', 'watch']);
	grunt.registerTask('images', ['imagemin', 'sprite']);
	grunt.registerTask('build', ['jshint:prod']);	
	grunt.registerTask('test', ['jasmine']);
	grunt.registerTask('zip', ['compress']);
};