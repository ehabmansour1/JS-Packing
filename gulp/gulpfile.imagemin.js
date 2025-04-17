const gulp = require("gulp");
const imagemin = require("gulp-imagemin");

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

exports.default = optimizeImages;
