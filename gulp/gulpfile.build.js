const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const imagemin = require("gulp-imagemin");

// SCSS compilation task
function compileSass() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
}

// Autoprefixer task
function prefixCss() {
  return gulp
    .src("src/css/*.css")
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("dist/css"));
}

// Image optimization task
function optimizeImages() {
  return gulp
    .src("src/images/**/*.{jpg,jpeg,png}")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest("dist/images"));
}

// Build task that runs all tasks in parallel
const build = gulp.parallel(compileSass, prefixCss, optimizeImages);

exports.default = build;
