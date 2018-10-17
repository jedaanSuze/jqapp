var gulp = require('gulp');
var serverFilesToCopy = require('./config/sourceFiles').serverFilesToCopy;
var distBuild = require('./config/sourceFiles').distBuild;
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');

module.exports = function (done) {
    return gulp.src(serverFilesToCopy).pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest(distBuild.server));
};
