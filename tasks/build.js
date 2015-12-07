let path = require('path');
let gulp = require('gulp');
let gulpBabel = require('gulp-babel');
let gulpSourcemaps = require('gulp-sourcemaps');
let gulpClean = require('gulp-clean');

let buildDir = path.join(__dirname, '..', 'build');
let srcDir = path.join(__dirname, '..', 'src');

gulp.task('clean', () => {
  return gulp.src(path.join(buildDir, '*'), {read: false})
        .pipe(gulpClean());
});

gulp.task('copy', ['clean'], () => {
  return gulp.src(path.join(srcDir, '**/*'))
              .pipe(gulp.dest(buildDir));
});

gulp.task('scripts', ['copy'], () => {
  return gulp.src(path.join(buildDir, '**/*'))
          .pipe(gulpSourcemaps.init())
          .pipe(gulpBabel({
            presets: ['es2015']
          }))
          .pipe(gulpSourcemaps.write('.'))
          .pipe(gulp.dest(buildDir));
});

gulp.task('build', ['scripts']);
