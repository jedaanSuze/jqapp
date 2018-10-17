'use strict';

var gulp = require('gulp');
var gulp_clean = require('gulp-clean');
var runSequence = require('run-sequence');


module.exports = function (done) {
  gulp.task('clean:widget', function () {
    return gulp.src(['client/widget'], {read: false})
      .pipe(gulp_clean());
  });

  gulp.task('clean:scripts', function () {
    return gulp.src(['client/scripts/**.js'], {read: false})
      .pipe(gulp_clean());
  });

  gulp.task('clean:assets', function () {
    return gulp.src(['client/assets/'], {read: false})
      .pipe(gulp_clean());
  });

  gulp.task('clean:translations', function () {
    return gulp.src(['client/translations'], {read: false})
      .pipe(gulp_clean());
  });

  gulp.task('clean:ejs', function () {
    return gulp.src(['client/*.ejs'], {read: false})
      .pipe(gulp_clean());
  });

  return runSequence([ 'clean:widget', 'clean:ejs', 'clean:translations', 'clean:assets', 'clean:scripts'], done);
};
