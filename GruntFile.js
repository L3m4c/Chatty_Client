module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    var webroot = 'app/';
    var jsSources = webroot + 'js/src/**/';
    var jsBundle = webroot + 'js/app.js';
    var jsConfigs = webroot + 'js/config/'

    grunt.initConfig({
        browserify: {
            dev: {
                options: {
                    bundleOptions: {
                        debug: true
                    },
                    alias: [
                            jsConfigs + 'dev/RouteService.js:RouteService'
                    ]
                },
                src: [jsSources + '*.js'],
                dest: jsBundle
            }
        },
        watch: {
            browserify: {
                files: [jsSources + '*.js'],
                tasks: ['compileBundleDev']
            },
            livereload: {
                files: [webroot + '**', '!'+jsSources+'*.js'],
                options: {
                    livereload: true
                }
            }
        },
        'http-server': {
            front: {
                port: 3000,
                root: webroot
            }
        },
        concurrent: {
            target: ['watch:livereload', 'watch:browserify', 'http-server:front'],
            options: {
                limit: 10,
                logConcurrentOutput: true
            }
        },
        clean: [
            jsBundle
        ],
        jshint: {
            options: {
                asi: true,
                eqnull: true,
                globals: {
                    'require': true,
                    'angular': true
                }
            },
            files: {
                src: [
                    'Gruntfile.js', 'app/js/src/**/*.js'
                ]
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['app/js/test/**/*.js']
            }
        }
    });

    grunt.registerTask('test', 'mochaTest');
    grunt.registerTask('compileBundleDev', ['clean', 'jshint', 'browserify:dev']);
    grunt.registerTask('server', ['compileBundleDev', 'concurrent:target']);
};