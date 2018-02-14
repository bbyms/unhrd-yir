var gulp = require("gulp"),
    sass = require('gulp-sass'),
    watch = require("gulp-watch"),
    gutil = require('gulp-util'),
    cleanCSS = require('gulp-clean-css'),
    ejs = require("gulp-ejs"),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync').create();

    gulp.task('serve', ['sass'], function() {

        browserSync.init({
            server: "dist/",
            port: "9000"
        });

        gulp.watch('assets/sass/**/*.scss', ['sass']);
        gulp.watch('assets/templates/**/*.ejs', ['templates']);
        gulp.watch('dist/css/*.css').on('change', browserSync.reload);
        gulp.watch('dist/*.html').on('change', browserSync.reload);
    });

    gulp.task('sass', function () {
       return gulp.src('assets/sass/**/*.scss')
          .pipe(sass())
          .pipe(gulp.dest('dist/css'))
          .pipe(browserSync.stream());
    });

    // minify css
    gulp.task('minify-css', function() {
      return gulp.src('dist/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css/'));
    });

    // compile ejs templates
    gulp.task('templates', function () {
       return gulp.src('assets/templates/*.ejs')
         .pipe(ejs({}, {ext:'.html'}))
         .pipe(gulp.dest('./dist'))
         .pipe(browserSync.stream());
    });

    // watch sass and templates
    gulp.task('watch', function() {
        gulp.watch(['assets/scss/**/*.scss'] , ['sass']);
        gulp.watch('assets/templates/*.ejs' , ['templates']);
    });


    gulp.task('all', ['default'], function() {
      // Do stuff
    });

    gulp.task('default', ['serve']);
