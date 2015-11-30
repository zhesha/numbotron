var gulp = require("gulp");
var watch = require('gulp-watch');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');
var gutil = require('gutil');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build', () => {
    var b = browserify({
        entries: ['src/index.js'],
        cache: {},
        packageCache: {},
        debug: true
    });
    b.transform(babelify, {presets: ['es2015']});
    b.on('error', gutil.log);
    b.on('time', gutil.log);

    return b.bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.js', ['build']);
    gulp.watch('less/**/*.less', ['less']);
});

gulp.task('less', function () {
    return gulp.src('less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch', 'build', 'less']);