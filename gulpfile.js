var gulp = require('gulp');
var compass = require('gulp-compass');
 
gulp.task('compass', function() {
  gulp.src('./css_src/*.scss')
    .pipe(compass({
      css: 'montrack/montrack/static/css',
      sass: 'css_src',
      image: 'montrack/montrack/static/images',
      javascript: 'montrack/montrack/static/js',
      import_path: 'node_modules/materialize-css/sass'
    }))
    .pipe(gulp.dest('montrack/montrack/static/css'));
});
