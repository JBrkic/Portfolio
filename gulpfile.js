const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gutil = require('gulp-util');

// Compile Sass & Inject Into Browser
gulp.task('sass', function () {
    return gulp.src(['src/scss/*.scss'])
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message: err.toString()
                })(err);

                // play a sound once
                gutil.beep();
            }
        }))
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});


// Watch Sass & Serve
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: "./src"
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve']);