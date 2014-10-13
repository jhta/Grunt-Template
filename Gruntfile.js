module.exports = function(grunt){
    var CSSlibs=[
        'dev/css/libs/foundation.css'
    ];
    grunt.initConfig({
       //opcion para ejecutar browserify y genrar common.js
      browserify: {
        all: {
          src: 'dev/js/main.js',
          dest: 'public/bundle.js',
          options: {
            transform: ['debowerify'],
          },
        },
      },
        uglify: {
            myApp: {
                //opciones para la configuracion de uglify
                options: {
                    banner: '/* create by inFactory */' 
                    //mensaje que aparecera en el tope de del rchivo minificado
                },
                files:{
                    'public/bundle.min.js': 'public/bundle.js'   
                    //nombre de archivo que se creara y cual es su fuente
                }
            }  
        },
        stylus:{
            compile: {
                files:{
                    'public/style.css':'dev/stylus/general.styl', 
                    //archivo de destino -- archivo origne     
                }
            }
            
        },
        jade: {
          compile: {
            options: {
              data: {
                debug: false
              }
            },
            files: {
              "dev/html/index.html": [ "dev/jade/layout.jade"]
            }
          }
        },
        htmlmin:{
            myApp: {
                options: {                                 // Target options
                    removeComments: true, //elimino los comentarios
                    collapseWhitespace: true 
                },
                files: {
                    //'index.html':'dev/html/index.html',
                    'public/index.html':'dev/html/index.html' //destino: origen
                }
            }
        },
        
        cssmin: { 
          options: {
            banner: '/* My minified css file */'
          },
            combine: {
                files: { 
                    'public/libs.min.css': CSSlibs 
                }
            }  
        },
        
        watch:{
            scripts:{
                files:['dev/**/*.js',
                       'dev/**/*.css',
                       'dev/**/*.jade',
                       'dev/**/*.html',
                       'dev/**/*.styl'
                      ], 
                //estos son los archivos bajo observacion
        	    tasks:['browserify','uglify','stylus','htmlmin','jade','cssmin'] 
                //estas son las tareas que sigue
            } ,
            options: {
                livereload: true
            }
        }
        
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    
    grunt.registerTask('html',['jade','htmlmin']);
    grunt.registerTask('js',['browserify','uglify']);
    grunt.registerTask('css',['stylus','cssmin']);
    grunt.registerTask('app',['browserify','uglify', 'stylus','cssmin','htmlmin','jade']);
};