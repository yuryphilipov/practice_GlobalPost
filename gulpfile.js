const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const gcmq = require('gulp-group-css-media-queries');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
    notify: false,
  });
}

function styles() {
  return gulp
    .src(['!app/src/scss/**/_*.scss', 'app/src/scss/**/*.scss'])
    .pipe(sass())
    .pipe(gcmq())
    .pipe(concat('app.min.css'))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
    .pipe(gulp.dest('app/dist/css'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}

function scripts() {
  return gulp
    .src(['node_modules/jquery/dist/jquery.min.js', 'app/src/js/**/*.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/dist/js'))
    .pipe(browserSync.reload({ stream: true }));
}

function images() {
  return gulp
    .src('app/src/img/**/*')
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
    .pipe(gulp.dest('app/dist/img/'))
    .pipe(browserSync.reload({ stream: true }));
}

function startwatch() {
  gulp.watch('app/src/scss/**/*.scss', styles);
  gulp.watch(['app/src/js/**/*.js', '!app/src/js/**/*.min.js'], scripts);
  gulp.watch('app/src/img/**/*', images);
  gulp.watch('app/*.html').on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;

exports.default = gulp.parallel(
  scripts,
  styles,
  images,
  browsersync,
  startwatch
);
