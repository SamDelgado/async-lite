'use strict';

var gulp = require('gulp');
var rename = require("gulp-rename");

/******************************************************************/

// uglify bundles javascript for production
var uglify = require('gulp-uglify');

gulp.task('uglify', function () {

  var uglifyStream = gulp.src("./async-lite.js")
    .pipe(uglify({
      mangle: true
    }))
    .pipe(rename("aysnc-lite.min.js"))
    .pipe(gulp.dest("./"))
    .on("err", function(err) {
      console.log(err);
    })

  return uglifyStream;

});

/************** Gulp Tasks *****************/
gulp.task('default', ['uglify']);
