var gulp       = require('gulp');
var ejsFiles = require('./config/sourceFiles').ejsFiles;
var destFolder = 'build/public';

module.exports = function(done) {
  gulp.src(ejsFiles).pipe(gulp.dest(destFolder)).on('end',done);
};
