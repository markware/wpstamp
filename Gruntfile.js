module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
uglify: {
     options: {
       banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
     },
     build: {
       src: 'public/js/<%= pkg.name %>.js',
        dest: 'public/js/<%= pkg.name %>.min.js'
     }
    }, 
	less: {
            development: {
                options: {
                    paths: ["less"],
                    yuicompress: true
                },
                files: {
                    "public/css/app.css": "less/app.less"
                }
            }
        },
        watch: {
            files: ["less/*",'assets/js/*.js'],
            tasks: ["less"]
        }
	
  });

    grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['less','uglify']);

};
