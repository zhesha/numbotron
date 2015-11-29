var gulp = require("gulp");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');
var gutil = require('gutil');

gulp.task('sc', () => {
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