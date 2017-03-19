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

gulp.task('init_static', function() {
  gulp.src('./node_modules/materialize-css/dist/fonts/roboto/Roboto*')
    .pipe(gulp.dest('montrack/montrack/static/fonts/roboto'));

  gulp.src('./node_modules/materialize-css/dist/js/*.js')
    .pipe(gulp.dest('montrack/montrack/static/js'));
});
