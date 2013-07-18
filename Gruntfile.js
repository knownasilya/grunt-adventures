"use strict";

module.exports = function (grunt) {

  var jshintOptions = grunt.file.readJSON(".jshintrc"),
    scriptsDir = "app/scripts",
    allAppScripts = scriptsDir + "/**/*.js",
    docsDir = "docs";


  // Load modules
  grunt.loadNpmTasks("grunt-docco");
  grunt.loadNpmTasks("grunt-plato");
  // Contrib modules (made by grunt core team)
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Project configuration.
  grunt.initConfig({
    docco: {
      debug: {
        src: [allAppScripts],
        options: {
          output: docsDir
        }
      }
    },

    plato: {
      all: {
        options: {
          jshint: jshintOptions
        },
        files: {
          "report": [allAppScripts]
        }
      }
    },

    watch: {
      all: {
        files: ["<%= jshint.all.src %>"],
        tasks: ["jshint"],
        options: { 
          nospawn: false 
        }
      }
    },

    jshint: {
      options: jshintOptions,
      all: { 
        src: ["Gruntfile.js", allAppScripts] 
      } 
    }
  });

  

  // Default task
  grunt.registerTask("default", [
    "watch", 
  ]);

  // Build Task
  grunt.registerTask("build", [
    "plato",
    "docco"
  ]);
};