var db = require('./config/dbschema');

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');  

  grunt.registerTask('dbseed', 'seed the database', function() {
    grunt.task.run('adduser:admin:admin@example.com:secret:true');
    grunt.task.run('adduser:bob:bob@example.com:secret:false');
  });

  grunt.registerTask('adduser', 'add a user to the database', function(usr, emailaddress, pass, adm) {
    // convert adm string to bool
    adm = (adm === "true");

    var user = new db.userModel({ username: usr
    				, email: emailaddress
    				, password: pass
    				, admin: adm });
    
    // save call is async, put grunt into async mode to work
    var done = this.async();

    user.save(function(err) {
      if(err) {
        console.log('Error: ' + err);
        done(false);
      } else {
        console.log('saved user: ' + user.username);
        done();
      }
    });
  });

  grunt.registerTask('dbdrop', 'drop the database', function() {
    // async mode
    var done = this.async();

    db.mongoose.connection.on('open', function () { 
      db.mongoose.connection.db.dropDatabase(function(err) {
        if(err) {
          console.log('Error: ' + err);
          done(false);
        } else {
          console.log('Successfully dropped db');
          done();
        }
      });
    });
  });




// grunt.initConfig({
//   pkg: grunt.file.readJSON('package.json'),
//   dirs: {
//     src: '/client',
//     dest: 'dist/<%= pkg.name %>/<%= pkg.version %>',
//   },
//   concat: {
//     basic: {
//       src: ['/js/alertController.js'],
//       dest: '<%= dirs.dest %>/basic.js',
//     },
//     extras: {
//       src: ['<%= dirs.src %>/main.js', '<%= dirs.src %>/extras.js'],
//       dest: '<%= dirs.dest %>/with_extras.js',
//     },
//   },
// });


  // All upfront config goes in a massive nested object.
  grunt.initConfig({
    // You can set arbitrary key-value pairs.
    distFolder: 'dist/<%= pkg.name %>',
    // You can also set the value of a key as parsed JSON.
    // Allows us to reference properties we declared in package.json.
    pkg: grunt.file.readJSON('package.json'),
    // Grunt tasks are associated with specific properties.
    // these names generally match their npm package name.
    concat: {
      // Specify some options, usually specific to each plugin.
      options: {
        // Specifies string to be inserted between concatenated files.
        separator: "; \n",
        process: function(src, filepath) {
                        return '// Source: ' + filepath + '\n' +
                            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                    }
      },
      // 'dist' is what is called a "target."
      // It's a way of specifying different sub-tasks or modes.
      dist: {
        // The files to concatenate:
        // Notice the wildcard, which is automatically expanded.
        src: ['client/js/*.js'],
        // The destination file:
        // Notice the angle-bracketed ERB-like templating,
        // which allows you to reference other properties.
        // This is equivalent to 'dist/main.js'.
        dest: '<%= distFolder %>/main.js'
        // You can reference any grunt config property you want.
        // Ex: '<%= concat.options.separator %>' instead of ';'
      }
    },
    ngmin: {
            compile: {
                expand: false,
                src: '<%= distFolder %>/main.js',
                dest: '<%= distFolder %>/main_ngmin.js'
            }
        },
    uglify: {
            options: {
              compress: {
                drop_console: true
              }
            },
            compile: {
                files: {
                    '<%= distFolder %>/output.min.js': ['<%= distFolder %>/main_ngmin.js']
                }
            }
        }
  }); // The end of grunt.initConfig










};
