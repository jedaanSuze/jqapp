'use strict';

/**
 * Serve app. For dev purpose.
 */

var gulp        = require('gulp');
var ripe        = require('ripe');
var nodemon     = require('gulp-nodemon');
var livereload  = require('gulp-livereload');
var config      = require('../server/config/environment');


var openOpts = {
    uri: 'http://localhost:' + config.port,
    already: false
};

module.exports = {
    nodemon: function () {
        return nodemon({
            script: 'build/server/bundle-server.js',
            ext: 'js',
            ignore: ['client', 'dist', 'node_modules', 'gulpfile.js','src','public','tests','build'],
        }).on('start', function () {

            if (!openOpts.already) {
                openOpts.already = true;
                ripe.wait(function () {
                    // gulp.src('src/views/index.ejs').pipe(open(openOpts));
                });
            } else {
                ripe.wait(function () {
                    livereload.changed('/');
                });
            }
        }).on('restart',function () {
            ripe.wait(function () {
                livereload.reload();
            });
        });
    }
};
