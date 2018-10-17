'use strict';

/**
 * Watch files, and do things when they changes.
 * Recompile scss if needed.
 */

var gulp = require('gulp');
var livereload = require('gulp-livereload');
var wait = require('gulp-wait');
var plumber = require('gulp-plumber');
var toExclude = require('./config/bowerFilesToExclude');
var srcFolder = 'src';
var runSequence = require('run-sequence');
var sourceFiles = require('./config/sourceFiles');
var nodeMon = require('nodemon');

var pureCopy = [
    srcFolder + '/assets/**/*',
    srcFolder + '/views/**/*.html',
    srcFolder + '/views/*/directives/*.html'
];

function babelize() {
    return gulp.src(srcFolder + '/**/*.js')
        .pipe(plumber())
        .pipe(gulp.dest('client'));
}


gulp.src(pureCopy, {base: './' + srcFolder}).pipe(gulp.dest('client'));

gulp.task('others', function () {
    gulp.src(pureCopy, {base: './' + srcFolder}).pipe(gulp.dest('client'));
    return babelize().pipe(wait(1000)).pipe(livereload());
});

gulp.task('styles', function () {
    gulp.task('sassTask', require('./sass.js'));
    runSequence('sassTask', function () {
        livereload.reload();
    });
});

gulp.task('ejs', function () {
    gulp.task('copyEjs', require('./copyEjs'));
    runSequence('copyEjs', function () {
        livereload.reload();
    });
});

gulp.task('ssrWatch', function () {
    runSequence(['lint', 'webpack:ssr'],'restartNodemon', function () {
    });
});

gulp.task('webpack:ssr', require('./gulp-webpack').SSR);
gulp.task('lint', require('./lint'));
gulp.task('translationsCombine', require('./translationsCombine'));

gulp.task('assets', function () {
    gulp.task('copyAssets',require('./copyAssets'));
    runSequence('copyAssets', function () {
        livereload.reload();
    });
});
gulp.task("liveReloader",function (done) {
    livereload.reload();
    done();
});

gulp.task('restartNodemon',function () {
    nodeMon.emit('restart');
});
gulp.task('serverWatch', function (done) {
    gulp.task('webpack:server', require('./gulp-webpack').serverWP);
    runSequence(['lint','webpack:server'],'restartNodemon',done);
});

module.exports = function () {

    gulp.task('watch', function () {
        livereload.listen();
        gulp.watch(sourceFiles.serverFiles, ['serverWatch']);
        gulp.watch(sourceFiles.sassFilesToWatch, ['styles']);
        gulp.watch(sourceFiles.ejsFiles, ['ejs']);
        gulp.watch(sourceFiles.assetsFiles,['assets']);
        gulp.watch(sourceFiles.translationFiles,['translationsCombine'],function () {
            console.log("done translations");
        });
        gulp.watch([sourceFiles.jsClientFiles], ['ssrWatch']);
    });
};
