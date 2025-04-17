const gulp = require("gulp");
const concat = require("gulp-concat");

function concatJs() {
  return gulp
    .src(["src/js/file1.js", "src/js/file2.js"])
    .pipe(concat("all.js"))
    .pipe(gulp.dest("dist"));
}

exports.default = concatJs;
