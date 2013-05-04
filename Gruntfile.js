/*jslint node: true */
'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        jsTarget: ['Gruntfile.js','dist/js/**/*.js'],
        notify_hoooks: {
            options: {
                enabled: true,
                title: "awesome project"
            }
        },
        watch: {
            compass: {
                files: ['compass/*.{scss,sass}'],
                tasks: ['compass']
            },
            negi: {
                files: ['data/**/*.{json,txt,csv,md,rst}','templates/**/*'],
                tasks: ['shell:negi']
            },
            jshint: {
                files: '<%= jsTarget %>',
                tasks: ['jshint:watch']
            }
        },
        connect: {
            options: {
                port:9000
            },
            dist: {
                options: {
                    base: 'dist'
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                force:true,
            },
            watch: {
                src: '<%= grunt.regarde.changed %>',
                options: {
                    devel:true
                }
            }
        },
        compass: {
            options: {
                sassDir: 'compass',
                cssDir: 'dist/assets/css',
                imagesDir: 'dist/assets/img',
                javascriptsDir: 'dist/assets/js',
                fontsDir: 'dist/assets/fonts',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        shell: {
            negi: {
                command: 'negi build -d ./data -o ./dist -t ./templates -v',
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: false
                }
            }
        }
    });


    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', function () {
        grunt.task.run([
            'compass:server',
            'shell:negi',
            'connect:dist',
            'open',
            'watch'
        ]);
    });


    grunt.registerTask('default', ['server']);
};
