var gulp       = require('gulp');
var distFolder = 'build/public/assets';
var assetsFiles = require('./config/sourceFiles').assetsFiles;

module.exports = function(done) {
  gulp.src(assetsFiles).pipe(gulp.dest(distFolder)).on('end',done);
};
