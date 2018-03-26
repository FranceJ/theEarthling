module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        postcss: {
            options: {
                map: true, // inline sourcemaps

                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: './css/style.css'
            }
        },

        sass: {
            dist: {
                files: {
                    './css/style.css': './sass/main.scss'
                }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            css: {
                files: ['./sass/**/*.scss','./sass/main.scss'],
                tasks: ['sass']
            },
            postcss: {
                files: './css/style.css',
                tasks: ['postcss:dist']
            }
        }
    });
    grunt.registerTask('compile', 'compile sass into css and apply postprocessing to css file', ['sass','postcss:dist', 'watch']);
    grunt.registerTask('autoPrefix', "Prefix css", ['postcss:dist']);
};
