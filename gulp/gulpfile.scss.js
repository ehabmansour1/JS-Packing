const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function compileSass() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
}

function watchSass() {
  gulp.watch("src/scss/**/*.scss", compileSass);
}

exports.default = compileSass;
exports.watch = watchSass;
