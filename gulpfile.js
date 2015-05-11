'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var merge = require('merge-stream');

var paths = {
  statics: [
    'src/index.html',
    'src/index.css',
    'src/index.js',
    'src/templates/**/*.html',
    'src/img/**/*'
  ],
  angularBootstrap: 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
  bootstrap: 'bower_components/bootstrap/dist/**/*',
  build: 'build/**/*'
};

// copy static files
gulp.task('statics', function () {
  var statics = gulp.src(paths.statics, {base: 'src'})
    .pipe(gulp.dest('build'));

  var angularBootstrap = gulp.src(paths.angularBootstrap)
    .pipe(gulp.dest('build/vendor/angular-bootstrap'));

  var bootstrap = gulp.src(
      'bower_components/bootstrap/dist/**/*',
      {src: 'bower_components/bootstrap/dist'}
    )
    .pipe(gulp.dest('build/vendor/bootstrap'));

  //var fontawesome = gulp.src('bower_components/fontawesome/fonts/*')
  //  .pipe(gulp.dest('build/assets/fontawesome/fonts'));

  return merge(statics, angularBootstrap, bootstrap);
});

gulp.task('clean', function(cb) {
  var del = require('del');

  del(['build/*'], cb);
});

// watch for changes
gulp.task('watch', ['default:watch'], function () {
  gulp.watch(paths.statics, ['statics']);
});

// serve with livereload
gulp.task('serve', ['serve:connect', 'watch', 'serve:watch']);

// serve built files
gulp.task('serve:connect', ['default:watch'], function () {
  connect.server({
    root: 'build',
    livereload: true,
  });
});

// live reload
gulp.task('serve:reload', function () {
  gulp.src(paths.build)
    .pipe(connect.reload());
});

// watch built files and initiate live reload
gulp.task('serve:watch', ['default:watch'], function () {
  gulp.watch(paths.build, ['serve:reload']);
});

gulp.task('default', ['statics']);
gulp.task('default:watch', ['statics']);
