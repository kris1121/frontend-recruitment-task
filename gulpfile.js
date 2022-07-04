const { src, dest, watch, series, parallel } = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');
const gulp = require('gulp');
const webpack = require("webpack-stream");
const loader = require('babel-loader')


// File paths
const files = { 
    scssPath: 'src/scss/**/*.scss',
    jsPath: 'src/js/**/*.js'
};

function scssTask(){    
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass([])) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist')
    ); // put final CSS in dist folder
}

function jsTask() {
    return gulp
    .src('./src/js/main.js')
      .pipe(
        webpack({
          output: {
            path: __dirname + '/dist',
            filename: 'all.js'
          },
           experiments: {
            topLevelAwait: true
          },
          module: {
            rules: [{
              test: /\.js$/,
              loader: 'babel-loader',
            }]
          }
        })
      )
      .pipe(gulp.dest('dist/'));
  }

function img() {
    return src('./src/img/*')
        .pipe(imagemin(imagemin.gifsicle({interlaced: true})))
        .pipe(dest('dist/img'));
}

function webpImage() {
    return src('dist/img/*')
        .pipe(imagewebp())
        .pipe(dest('dist/img'))
}

var cbString = new Date().getTime();
function cacheBustTask(){
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
}

function watchTask(){
    watch([files.scssPath, files.jsPath], 
        parallel(scssTask, jsTask));    
}

exports.default = series(
    scssTask, jsTask, img, webpImage, 
    cacheBustTask,
    watchTask
);