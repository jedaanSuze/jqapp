var gulp = require('gulp');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var jsoncombine = require("gulp-jsoncombine");
var gutil = require('gulp-util');
var distRoot = typeof( gutil.env.env) === 'undefined' ? "./build" : "./dist";

module.exports = function (done) {

  gulp.task("translation:widget", function (cb) {
    gulp.src('./src/translations/widget/*.json')
      .pipe(jsoncombine("widget.json", function (data) {
        return  new Buffer(JSON.stringify(data));
      }))
      .pipe(replace("text_", ""))
      .pipe(gulp.dest(distRoot + "/public/translations"))
      .on('end',cb)
      .on('error', function () {
        console.log("an occurred in translation:widget Task");
      });
  });


  return runSequence(['translation:widget'],done);
};
