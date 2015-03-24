module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        dev:'dev',
        production:'production',
        repo: 'git@github.com:kurjoz/sitepromo.git',
        pkg: grunt.file.readJSON('package.json'),
        //  Grunt Connect;
        less:{
            options: {
                sourceMap: true
            },
            core:{
                options: {
                    sourceMapFilename: '<%= dev %>/css/main.css.map',
                    sourceMapURL: 'main.css.map'
                },
                files: {
                    '<%= dev %>/css/main.css': '<%= dev %>/less/main.less'
                }
            },
            bootstrap:{
                options: {
                    sourceMapFilename: '<%= dev %>/css/bootstrap.css.map',
                    sourceMapURL: 'bootstrap.css.map'
                },
                files: {
                    '<%= dev %>/css/bootstrap.css': '<%= dev %>/less/bootstrap.less'
                }
            }
        },
        watch:{
            less: {
                files: ['<%= dev %>/less/**/*.less'],
                tasks: ['less']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= dev %>/*.html',
                    '<%= dev %>/css/**/*.css',
                    '<%= dev %>/im/**/*.*'
                    //'<%= dev %>/fonts/{,*/}*.*', // @TODO: Add Later;
                    //'<%= dev %>/*.{ico,png,txt,xml}'
                ]
            }
        },
        connect: {
            dev:{
                options:{
                    port:9006,
                    livereload: true,
                    hostname: '0.0.0.0',
                    base:'<%= dev %>',
                    //keepalive:'true',
                    open:'http://localhost:' + 9006
                }
            }
        },
        clean: {
            production: {
                src: ["<%= production %>"]
            }
        },
        copy: {
            production: {
                files: [
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        cwd: '<%= dev %>/',
                        src: [
                            'css/**',
                            'fonts/**',
                            'im/**',
                            '*.html',
                            '*.txt'

                        ],
                        dest: '<%= production %>/'
                    }
                ]
            }
        },
        buildcontrol: {
            options: {
                commit: true,
                push: true,
                remote: '<%= repo %>',
                message: 'update'
            },
            production: {
                options: {
                    dir: '<%= production %>',
                    branch: 'gh-pages'
                }
            }
        }
    });
    //  Loading Tasks
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-build-control');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', ['less','connect:dev','watch']);
    grunt.registerTask('ghp', ['clean:production','copy:production','buildcontrol:production']);

};