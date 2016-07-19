
const gulp = require('gulp'),
      config = require('./config.js'),
      concat = require('gulp-concat'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      del = require('del'),
      browserSync = require('browser-sync'),
      browserify = require('browserify'),
      babelify = require('babelify'),
      source = require('vinyl-source-stream'),
      reload = browserSync.reload;
    

gulp.task('sass', () => {
    return gulp.src(config.src.scss)
               .pipe(sourcemaps.init())
               .pipe(sass().on('error', sass.logError))
               .pipe(concat('styles.css'))
               .pipe(sourcemaps.write(config.maps))
               .pipe(gulp.dest(config.dest.css))
               .pipe(reload({stream: true}));
});


gulp.task('js', () => {
    return browserify(config.src.js, config.browserify)
              .transform(babelify, config.babelify)
              .transform('uglifyify', config.uglifyify)
              .bundle()
              .pipe(source(config.dest.nameJsBuildFile))
              .pipe(gulp.dest(config.dest.js))
              .pipe(reload({stream: true}));
});


gulp.task('clean', () => {
      return del.sync['build/'];
});


gulp.task('sync', ['sass', 'js'], function() {
          browserSync(config.browserSyncConfig);
          gulp.watch(config.src.scss, ['sass']);
          gulp.watch(config.src.jsReload, ['js']);
          gulp.watch(config.src.html).on('change', reload);
});


gulp.task('default', ['clean', 'sass', 'js',  'sync']);