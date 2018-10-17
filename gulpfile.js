'use strict';

var gulp = require('gulp');

// process.env.NODE_ENV = process.env.NODE_ENV || 'local';

gulp.task('copy',require('./tasks/copy'));
gulp.task('default',    ['message','serve']);
gulp.task('serve',      ['watch'],    require('./tasks/serve').nodemon);
gulp.task('watch',      ['webpack'],   require('./tasks/watch'));
gulp.task('webpack',['copyEjs','copyAssets','sassTask','lint','translationCombine'], require('./tasks/gulp-webpack').all);
gulp.task('copyEjs', require('./tasks/copyEjs'));
gulp.task('copyAssets',require('./tasks/copyAssets'));
gulp.task('sassTask'  , require('./tasks/sass'));
gulp.task('lint',require('./tasks/lint'));

// gulp.task('inject',     ['translationCombine'],     require('./tasks/inject'));
gulp.task('translationCombine',require('./tasks/translationsCombine'));

//production build tasks
gulp.task('preview',    ['build'],    require('./tasks/preview'));
gulp.task('build',                    require('./tasks/build'));
gulp.task('bump',       ['version'],  require('./tasks/chore').bump);
gulp.task('version',                  require('./tasks/chore').version);
gulp.task('control',                  require('./tasks/control'));
gulp.task('publish',        		  require('./tasks/publish'));

gulp.task('message',                    require('./tasks/startMessage'));
gulp.task('cleanClient',require('./tasks/cleanClient'));

gulp.task('webpackTest' , require('./tasks/gulp-webpack').all);

gulp.task('test', ['serve'],require('./tasks/test.js'));
