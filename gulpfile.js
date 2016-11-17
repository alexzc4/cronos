"use strict";

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var uncss = require('gulp-uncss');
var wiredep = require('wiredep').stream;
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var cssbeautify = require('gulp-cssbeautify');
var useref = require('gulp-useref');
var clean = require('gulp-clean');
var browserSync = require("browser-sync");
var reload = browserSync.reload;



// build
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('build/'));
});


gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


// css
gulp.task('minify', function() {
  return gulp.src('app/style/main.css')
    .pipe(minifyCSS(''))
    .pipe(rename('style.min.css'))
    .pipe(notify("Complete!"))
    .pipe(gulp.dest('app/style/'));
});

gulp.task('uncss', function () {
    return gulp.src('app/style/main.css')
        .pipe(uncss({
            html: ['app/index.html']
        }))
        .pipe(notify("Complete!"))
        .pipe(gulp.dest('app/style/'));
});
 

// css
gulp.task('sass', function() {
 return gulp.src('app/style/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions', '>0%'],     
   }))
  .pipe(rename('main.css'))
  .pipe(cssbeautify())
  .pipe(connect.reload())
  .pipe(gulp.dest('app/style/'));
});

gulp.task('sass:watch', function() {
  gulp.watch('app/style/main.scss',['sass']);
  gulp.watch('app/style/partials/app.scss',['sass']);
});

// bower plugins + live add .css .js files with watch
gulp.task('bower', function () {
  gulp.src('app/*.html')
    .pipe(wiredep({
      directory : "vendor",
      // ignorePath: /^(\.\.\/)+/
    }))
    .pipe(notify("Complete!"))
    .pipe(gulp.dest('app/'));
});

gulp.task('bower:watch', function() {
  gulp.watch('bower.json', ['bower']);

});


// livereload server
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true,
    open: true
  });
});

gulp.task('html-reload', function () {
  gulp.src('app/*.html')
    .pipe(connect.reload());
});

gulp.task('css-reload', function () {
  gulp.src('app/style/*.css')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('app/*.html', ['html-reload'])
  gulp.watch('app/style/*.css', ['css-reload'])
});


// livetime coding scss + livereload server
gulp.task('livereload',['connect','html-reload', 'css-reload','sass:watch', 'watch']);




