'use strict';

/** Build task **/
var gulp = require('gulp');
var runSequence = require('run-sequence');
var sq = require('streamqueue');
var del = require('del');
var map = require('map-stream');
var fs = require('fs');
var gutil = require('gulp-util');
var env = gutil.env.env || 'local';
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var pump = require('pump');
var sourceFiles = require('./config/sourceFiles');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfigServer = require('../webpack/deployment/webpack.server');
const webpackConfigClient = require('../webpack/deployment/webpack.client');


const path = require('path');

var baseDirs = {
    app: './',
    dist: './dist/',
    client: './client/**',
    assets: './client/assets/**',
    server: './server/**'
};
var serverCopy = [
    './server/**',
    '!server/client/**',
    '!server/viewsRenderer/*.js'
];

var distDirs = {
    client: baseDirs.dist + '/client/',
    assets: baseDirs.dist + '/client/assets/',
    server: baseDirs.dist + '/server/'
};


/*********************************Remove dist folder *************************************/
gulp.task('clean:dist', function (done) {
    del([baseDirs.dist + '**', 'client/tmp', '!' + baseDirs.dist, '!' + baseDirs.dist + '.git{,/**}'])
        .then(function () {
            done();
        }).catch(done);
});

var paths = {
    main: ['package.json', 'app.yaml'],
    images: 'client/assets/images/**',
    assetStyles: 'client/assets/styles/**',
    services: 'client/services/**/*',
    styles: 'client/styles/**/*',
    translations: 'client/translations/**/*',
    views: 'client/views/**/*',
    ejs: "client/*.ejs",
    assetsStatics: "client/assets/static/**",
    libs: "client/assets/libs/**",
    bootstrapFonts: "client/bower_components/bootstrap/fonts/**",
    scripts: "client/scripts/**"
};

/******************************************************Server*************************************************************/
function replaceEnvironment(fileName, callback) {
    var indexText = "env: '" + gutil.env.env + "', " + "publicRoot: \"/public\", ";

    fs.stat(fileName, function (err, stat) {
        if (err == null) {
            gulp.src(fileName).pipe(map(function (file, cb) {
                var fileContents = file.contents.toString();

                fileContents = fileContents.replace(/\/\*startEnvironment\*\/([\S\s]+?)\/\*endEnvironment\*\//igm, indexText);
                file.contents = new Buffer(fileContents);
                cb(null, file);
            }))
                .pipe(gulp.dest('dist/server/config/environment/'));

            gulp.src(['server/config/environment/gcloud-' + gutil.env.env + '-key.json',
                'server/config/environment/' + gutil.env.env + '.js']).pipe(gulp.dest('dist/server/config/environment'));
            callback();
        } else {
            callback();
        }
    });
}

gulp.task('copy:server', function (done) {

    var envFile = 'dist/server/config/environment/index.js';

    gulp.task('copy:serverFiles', require('./copyServer'));
    // gulp.task('copy:serverFiles', function (done) {
    //     gulp.src(serverCopy).pipe(gulp.dest(distDirs.server)).on('end',done);
    // });
    gulp.task('replaceEnvironmentFiles', function (done) {
        replaceEnvironment(envFile, done);
    });

    runSequence('copy:serverFiles', 'replaceEnvironmentFiles', done);
});

/*******************************************************************************************************************/

gulp.task('copy:scripts', function (cb) {
    //copy scripts:
    try {
        pump([
                gulp.src(paths.scripts),
                uglify(),
                gulp.dest('dist/client/scripts/')
            ],
            cb
        );
    } catch (err) {
        console.log("scripts error");
    }

});

gulp.task('copy:src', function (done) {
    // Copy all assets
    gulp.src(sourceFiles.assetsFiles, {
        base: 'src/assets'
    })
        .pipe(gulp.dest(path.join(sourceFiles.distBuild.public, '/assets')))
        .on('end', done).on('error', function (err) {
        console.log("err", err);
    });
});
gulp.task('copy:ejs', function (done) {
    gulp.src(sourceFiles.ejsFiles, {base: './src/views'})
        .pipe(replace(/\s*<script.*livereload.*><\/script>/, ''))
        .pipe(gulp.dest(sourceFiles.distBuild.public)).on('end',done);
});
gulp.task('translationsCombine', require('./translationsCombine'));
gulp.task('copy:main', function (done) {
    gulp.src( paths.main,{base: './'}).pipe(gulp.dest('dist')).on('end', done);
});
gulp.task('sass', function () {
    gulp.src(sourceFiles.sassFiles)
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(sourceFiles.distBuild.public + '/styles'));
});
gulp.task('webpack:client', function (done) {
    gulp.src(['./src/index/client.js'])
        .pipe(webpackStream(webpackConfigClient, webpack))
        .pipe(gulp.dest('./dist/public/scripts')).on('end', done);
});

gulp.task('webpack:server', function (done) {
    gulp.src(['./server/viewsRenders'])
        .pipe(webpackStream(webpackConfigServer, webpack))
        .pipe(gulp.dest('./dist/server/viewsRenders')).on('end', done);
});
gulp.task('setEnvironmentVariable', function () {
    return process.env.NODE_ENV = 'production';
});

module.exports = function (done) {
    runSequence(
        'setEnvironmentVariable',
        'clean:dist',
        ['copy:main', 'copy:ejs', 'sass', 'copy:src','translationsCombine'],
        ['webpack:client'],
        'copy:server',
        ['webpack:server'],
        done);
};
