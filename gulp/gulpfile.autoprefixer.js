const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

function prefixCss() {
  return gulp
    .src("src/css/*.css")
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("dist/css"));
}

exports.default = prefixCss;
