var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var assetsFiles = [
    'src/assets/**/*.svg',
    'src/assets/images/**/*.svg'];
var dist = require('./config/sourceFiles').distBuild;
module.exports = function (done) {
    gulp.src(assetsFiles)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(gulp.dest('build')).on('end',done);
};
