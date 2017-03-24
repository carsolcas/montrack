var gulp = require('gulp');
var compass = require('gulp-compass');

var webpack = require('webpack');
var gutil = require("gulp-util");

const path = require('path');
const webpackConfig = require(path.join(__dirname,'webpack.config.js'));

const PATHS = {
  src_css: './css_src/**/*.scss',
  src_js: './js_src/**/*.{js,jsx}',
  materialize: path.join(__dirname, 'node_modules/materialize-css'),
  build: path.join(__dirname, 'montrack/montrack/static'),
}

gulp.task('compass', function() {
  gulp.src(PATHS.src_css)
    .pipe(compass({
      css: path.join(PATHS.build, 'css'),
      sass: 'css_src',
      image: path.join(PATHS.build, 'images'),
      javascript: path.join(PATHS.build, 'js'),
      import_path: path.join(PATHS.materialize, 'sass'),
    }))
    .pipe(gulp.dest(path.join(PATHS.build, 'css')));
});

gulp.task('webpack', function(callback) {
  webpack(webpackConfig,
    function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
        }));
        callback();
    });
});

gulp.task('watch', function() {
  gulp.watch(PATHS.src_css, ['compass']);
  gulp.watch(PATHS.src_js, ['webpack']);
});

gulp.task('init_static', function() {
  gulp.src(path.join(PATHS.build, 'dist/fonts/roboto/Roboto*'))
    .pipe(gulp.dest(path.join(PATHS.build, 'fonts/roboto')));
});
