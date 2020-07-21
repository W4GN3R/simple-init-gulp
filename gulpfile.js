'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require("node-sass");
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss')
const concat = require('gulp-concat');
const minify = require('gulp-minify');

gulp.task('default', watch);
gulp.task("sass", compiladorCss);
gulp.task("js", compiladorJs);

function compiladorCss() {
  return gulp.src( './src/scss/**/*.scss' ) 
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('./dist/css/'));
}
function compiladorJs() {  
  return gulp.src('./src/js/**/*.js')
    .pipe(concat('index.js'))
    .pipe(minify({
      ext:{
          min:'.js'
      },
      noSource: true
    }))
    .pipe(gulp.dest('./dist/js'));
}

function watch() {
  gulp.watch('./src/scss/**/*.scss', compiladorCss);
  gulp.watch('./src/js/**/*.js', compiladorJs);
}

