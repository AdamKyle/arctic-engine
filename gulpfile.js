var gulp        = require('gulp');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var babelify    = require("babelify");
var watch       = require('gulp-watch');

gulp.task('make:example', function() {
  return browserify({entries: [
        './examples/index.js'
      ]})
      .transform("babelify")
      .bundle()
      .pipe(source('compiled-example.js'))
      .pipe(gulp.dest('dist/example/'));
});
