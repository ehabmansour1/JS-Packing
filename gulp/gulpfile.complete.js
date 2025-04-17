const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");

// BrowserSync task
function serve() {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });

  // Watch files for changes
  gulp.watch("src/index.html").on("change", browserSync.reload);
  gulp.watch("src/js/*.js").on("change", browserSync.reload);
  gulp.watch("src/css/*.css").on("change", browserSync.reload);
}

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

// Copy assets task
function copyAssets() {
  return gulp.src("src/assets/**/*").pipe(gulp.dest("dist/assets"));
}

// Clean JS files task
function cleanJs() {
  return gulp.src("dist/**/*.js", { read: false }).pipe(clean());
}

// Build task that runs all tasks in parallel
const build = gulp.parallel(compileSass, prefixCss, optimizeImages, copyAssets);

// Default task that runs clean first, then build
exports.default = gulp.series(cleanJs, build, serve);
