/*
 * grunt-gss-c
 * https://github.com/djerbic/grunt-gss
 *
 * Copyright (c) 2014 Davor Jerbic
 * Licensed under the MIT license.
 */

"use strict";

var exec  = require('child_process').exec;

module.exports = function(grunt) {
  grunt.registerMultiTask('gss', 'Google Closure Stylesheets plugin.', function() {
    var done = this.async();

    var options = this.options({
      flags: [],
      compilerPath: '',
      closureRenaming: {
        rename: false,
        excludeRenameClasses: [],
        outputFile: 'cssMap.js'
      }
    });

    var cmds = [];
    var cmdsDone = 0;

    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        else {
          return true;
        }
      }).join(' ');

      var dest = f.dest;
      var additionalParams = ' ' + options.flags.join(' ');

      var renameParams = ' ';
      if (options.closureRenaming && options.closureRenaming.rename) {
        renameParams = ' --output-renaming-map-format CLOSURE_COMPILED --rename CLOSURE --output-renaming-map ' + options.closureRenaming.outputFile;
        if (options.closureRenaming.excludeRenameClasses) {
          options.closureRenaming.excludeRenameClasses.forEach(function(exClass) {
            renameParams += ' --excluded-classes-from-renaming ' + exClass;
          });
        }
      }

      var cmd = 'java -jar ' + options.compilerPath + '/closure-stylesheets.jar ' + additionalParams + renameParams + ' ' + src + ' > ' + dest;
      cmds.push(cmd);
      grunt.log.write(cmd);
    });

    cmds.forEach(function(cmd) {
      try {
        exec(cmd, function (err) {
          cmdsDone++;
          if (err) {
            grunt.warn(err);
            done(false);
            return;
          }

          if (cmdsDone === cmds.length) {
            done(true);
          }
        });
      } catch (err) {
        grunt.warn(err);
        done(false);
      }
    });
  });
};
