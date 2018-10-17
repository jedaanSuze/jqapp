var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprites');
var svgmin = require('gulp-svgmin');
var path = require('path');
var assetsFiles = [
    'src/assets/**/*.svg',
    'src/assets/images/**/*.svg'];
var dist = require('./config/sourceFiles').distBuild;
module.exports = function (done) {
    gulp.src(assetsFiles)
        .pipe(svgSprite({mode: "symbols"}))
        .pipe(gulp.dest("build")).on('end',done);
};
