var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    rigger = require('gulp-rigger'),
    cssnano = require('gulp-cssnano');


gulp.task('sass', function() {
    gulp.src('style/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cssnano())
        .pipe(gulp.dest('style'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('html', function(){
  gulp.src('./html/*.html')
    .pipe(rigger())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    port: 8081,
    open: true,
    notify: false
  });
});
/*
gulp.task('default', ['sass'], function() {

    gulp.watch('style/*.scss', ['sass']);
})
*/
gulp.task('watcher',function(){
  gulp.watch('style/**/*.scss', ['sass']);
  gulp.watch('./**/*.html', ['html']);  
  gulp.watch('./html/**/*.html', ['html']);  
});

gulp.task('default', ['watcher', 'browserSync']);