module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        files: {
          // target.css file: source.less file
          "styles/styles.css": "styles/styles.less",
        }
      }
    },
    watch: {
      styles: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['styles/styles.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      scripts: {
        files: ['js/program.js'],
        tasks: ['concat'],
        options: {
          nospawn: true
        }
      }
    },
    concat:{
      dist : {
         src: ['js/jquery.js','js/program.js'],
         dest: 'js/main.js',
      }
    }
  }),

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['less','concat']);

};