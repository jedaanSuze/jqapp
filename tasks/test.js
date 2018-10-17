var gulp = require('gulp');
var mocha = require('gulp-mocha');
var runSequence         = require('run-sequence');

var config = require('../server/config/environment/index.js');
var env = config.env;

// var server = require('../build/bundle-server.js');
var ripe = require('ripe');
gulp.task('before', function(done){
  if(env === 'local'){
    ripe.wait(function () {
      done();
    });
  }else{
    done()
  }
});

gulp.task('runTests',function (done) {
  gulp.src('./tests/*.test.js', {read: false})
    .pipe(mocha({ reporter: 'list' })).on("end", done);
});

gulp.task('watchTestFiles',function () {
  gulp.watch(['./tests/*.test.js'], ['runTests']);
});

module.exports = function (done) {
  return runSequence('before','runTests','watchTestFiles',done);
};
