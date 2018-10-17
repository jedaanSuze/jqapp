'use strict';

/**
 * Serve app. For dev purpose.
 */

var gulp        = require('gulp');
var ripe        = require('ripe');
var nodemon     = require('gulp-nodemon');
var open        = require('gulp-open');
var livereload  = require('gulp-livereload');
var config      = require('../server/config/environment');

// gulp.task('webpackServer' , require('./webpack'));

var openOpts = {
    uri: 'http://localhost:' + config.port,
    already: false
};

module.exports = {
    nodemon: function () {
      return nodemon({
            script: 'dist/server/server.js',
            ext: 'js',
            ignore: ['client', 'server', 'node_modules', 'gulpfile.js','build','public','tests'],
          tasks:[]

        }).on('start', function () {

            if (!openOpts.already) {
                openOpts.already = true;
                ripe.wait(function () {
                    gulp.src('client/index.ejs').pipe(open(openOpts));
                });
            } else {
                ripe.wait(function () {
                    livereload.changed('/');
                });
            }
        });
    }
};
