const gulp = require('gulp');
const runSequence = require('run-sequence');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfigServer = require('../webpack/webpack.server');
const webpackConfigClient = require('../webpack/webpack.client');



gulp.task('bundle:server', function (done) {
    gulp.src('./server/server.js')
        .pipe(webpackStream(webpackConfigServer), webpack)
        .pipe(gulp.dest('./build/')).on('end', done);
});

gulp.task('bundle:client:others', function (done) {
    gulp.src(['./src/'])
        .pipe(webpackStream(webpackConfigClient), webpack)
        .pipe(gulp.dest('./build/public/scripts')).on('end', done);
});

module.exports = {
    all: function (done) {
        return runSequence(['bundle:server','bundle:client:others'],done);
    },
    SSR: function (done) {
        return runSequence(['bundle:server', 'bundle:client:others'], done);
    },
    serverWP: function (done) {
        runSequence('bundle:server', done);
    }

};
