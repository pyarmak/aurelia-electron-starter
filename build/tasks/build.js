var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var assign = Object.assign || require('object.assign');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('./tsconfig.json', {
  typescript: require('typescript'),
  declarationFiles: false,
  noExternalResolve: true
});

// gulp-typescript compiles TS files directly into ES5
gulp.task('build-system', function () {
  var tsResult = gulp.src([paths.source, paths.dtsSource])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));
  return tsResult.js
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: paths.sourceMapRelativePath }))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html'],
    callback
  );
});
