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
  build: 'build/**/*'
};

// copy static files
gulp.task('statics', function () {
  var statics = gulp.src(paths.statics, {base: 'src'})
    .pipe(gulp.dest('build'));

  var angular = gulp.src([
    'bower_components/angular/angular.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
  ]).pipe(gulp.dest('build/vendor/angular'));

  var angularBootstrap = gulp.src('bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js')
    .pipe(gulp.dest('build/vendor/angular-bootstrap'));

  var bootstrap = gulp.src(
      'bower_components/bootstrap/dist/**/*',
      {base: 'bower_components/bootstrap/dist'}
    )
    .pipe(gulp.dest('build/vendor/bootstrap'));
  
  var jquery = gulp.src('bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('build/vendor/jquery'));
  
  var opensans = gulp.src([
    'bower_components/open-sans-fontface/open-sans.css',
    'bower_components/open-sans-fontface/fonts/**/*',
  ], {base: 'bower_components/open-sans-fontface'})
    .pipe(gulp.dest('build/vendor/opensans'));

  var fontawesome = gulp.src([
    'bower_components/font-awesome/fonts/*',
    'bower_components/font-awesome/css/font-awesome.min.css',
  ], {base: 'bower_components/font-awesome'})
    .pipe(gulp.dest('build/vendor/fontawesome'));

  return merge(statics, angular, angularBootstrap, bootstrap, fontawesome,
               jquery, opensans);
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
