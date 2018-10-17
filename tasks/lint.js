var gulp = require('gulp');
var lint = require('gulp-eslint'); //Lint JS files, including JSX
var jsClientFiles  = require('./config/sourceFiles').jsClientFiles;

var jsPath = jsClientFiles


module.exports = function (done) {
    return gulp.src(jsPath)
        .pipe(lint())
        .pipe(lint.format());
};
