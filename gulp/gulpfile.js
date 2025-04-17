// Import packages (CommonJS)
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const cleancss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const sass = require("gulp-sass")(require("sass"));

// Task Creation:
// Gulp Demo
// 1. CopyHTML/CSS/JS files from src to dist
// gulp.task('copy', () => {
// 	return gulp.src('src/*').pipe(gulp.dest('dist'));
// });

// Task: delete dist files
gulp.task("clean", () =>
  gulp.src("dist", { allowEmpty: true, read: false }).pipe(clean())
);

// Task: Minify HTML
gulp.task("minify-html", () =>
  gulp
    .src("src/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())
);

// Task: Minify CSS
gulp.task("minify-css", () =>
  gulp
    .src("src/*.css")
    .pipe(
      cleancss({
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())
);

// Task: Minify JS
gulp.task("minify-js", () =>
  gulp
    .src("src/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())
);

// Task 2: Serve and Watch
gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
});

// Task 2: Watch changes in files
gulp.task("watch", () => {
  // Watch for changes and rerun task
  gulp.watch("src/*.html", gulp.series("minify-html"));
  gulp.watch("src/*.css", gulp.series("minify-css"));
  gulp.watch("src/*.js", gulp.series("minify-js"));
});

// Task 1: Build
gulp.task(
  "build",
  gulp.series("clean", "minify-html", "minify-css", "minify-js")
);

function compileSass() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
}

exports.default = compileSass;
exports.watch = function () {
  gulp.watch("src/scss/**/*.scss", compileSass);
};

// Default task to run all
gulp.task("default", gulp.series("build", gulp.parallel("watch", "serve")));
