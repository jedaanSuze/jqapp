'use strict';

/**
 * Compile sass
 */

var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var sass        = require('gulp-sass');
var concat = require('gulp-concat');
var sassFiles = require('./config/sourceFiles').sassFiles;

module.exports = function (done) {
    return gulp.src(sassFiles/*,{base:'./'}*/)
        .pipe(plumber())
        .pipe(sass())
        .pipe(concat('index.css'))
        .pipe(gulp.dest('build/public/styles'));
};

