module.exports = function(grunt) {

	//config
	grunt.initConfig({

		//Sass
		sass: {   // comprime e gera o css de um arquivo scss
			options: {
				sourceMap: true,
				outputStyle: 'compressed'
			},
	        dist: {
	            files: {
	                'public/temp/main.css': 'assets/scss/main.scss'
	            }
	        }
	    },
	    //watch
	    watch: { //observar alterações no arquivos configurados em files, caso tenha alteração ele executa a task informada.
	    	options: {
	    		livereload: true
	    	},
	    	sass: {
	    		files: 'assets/scss/*.scss',
	    		tasks: 'css'
	    	},
	    	css: {
	    		files: 'public/temp/main.css',
	    		tasks: 'cssmin'
	    	}

	    },
	    //connect
	    	connect: { // conectar a um servidor local
	    		server: {
	    			options: {
	    				port:9000,
	    				base: '.',
	    				hostname:'localhost',
	    				livereload: true
	    			}
	    		}
	    	},
	    	//Css
			cssmin: { // minificar css
				target: {
					files: {
						'public/css/style.min.css': [
							'components/normalize-css/normalize.css',
							'public/temp/main.css'
						]
					}
				}
			},
			jshint: { // validação de arquivos JS
				options: {
				    reporter: require('jshint-stylish'),
				    'curly': true, // caso true alerta sobre não estar utilizando chaves ex: if(true) return true;
				    'newcap': true, //caso true é sensitive case
				    'eqeqeq': true, // obriga a utilizar === para comparação, para que não seja considerado variaveis de outro tipo ex: 5 === 'teste'
				    'undef': true, // não deixa declarar variavel sem a tag var na frente
				    'devel': true, // caso false (padrão) não deixa utilizar alert e console.log
				    'debug'true, // caso false (padrão) não deixa utilziar o comando debugger
				    'globals': { // configura variavel de escopo global que podem ser usadas no arquivo
				    	'$':true,
				    	'JQuery': true
				    }
				},
				all: ['assets/js/main.js']
			}

	});

	//Load plugins
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	//Tasks
	grunt.registerTask('css', ['sass']);
	grunt.registerTask('cssmin', ['cssmin']);
	grunt.registerTask('live', ['connect', 'watch','cssmin']);
	grunt.registerTask('js', ['jshint:all']);

};