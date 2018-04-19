const gulp = require('gulp');
const webpack = require('webpack-stream');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const connect = require('gulp-connect');
const copy = require('gulp-copy');

// Run webpack
gulp.task('webpack', function(){
    return gulp.src('src/main.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('dist/js/'))
        .pipe(connect.reload());
});

// Run the webserver
gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        root: 'dist',
        port: 9000
    });
});

// Copy index.html file
gulp.task('build.index', function(){
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('images', function () {
    return gulp.src('./src/assets/images/*')
        .pipe(gulp.dest('./dist/images'))
});


gulp.watch('src/**', ['build.index']);

// Default task
gulp.task('default', ['webpack', 'images', 'webserver', 'build.index']);
