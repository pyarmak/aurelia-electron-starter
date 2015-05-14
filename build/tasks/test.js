var gulp = require('gulp');
var karma = require('karma').server;
var paths = require('../paths');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var reportChange = require('../reportChange').reportChange;

var tsProject = ts.createProject({
  typescript: require('typescript'),
  declarationFiles: false,
  noExternalResolve: false,
  target: "es5",
  module: "amd",
  emitDecoratorMetadata: true
});

// compile unit test TS file
gulp.task('build-test', function () {
  var tsResult = gulp.src([paths.unitSpecsSrc, paths.dtsSource], {base: "src/"})
    .pipe(ts(tsProject));
  return tsResult.js
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: paths.sourceMapRelativePath }))
    .pipe(gulp.dest(paths.unitSpecsDist));
});

gulp.task('test', function(callback) {
  return runSequence(
    'clean',
    'build-system',
    'build-test',
    'karma-single',
    callback
  );
});

/**
 * Run test once and exit
 */
gulp.task('karma-single', function (done) {
  karma.start({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: true
  }, function (e) {
    done();
  });
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('karma-continuous', function (done) {
  karma.start({
    configFile: __dirname + '/../../karma.conf.js'
  }, function (e) {
    done();
  });
});

/**
 * Watch main files for changes
 */
gulp.task('watch-system', function (done) {
  gulp.watch(paths.source, ['build-system']).on('change', reportChange);
});

/**
 * Watch test files for changes
 */
gulp.task('watch-test', function (done) {
  gulp.watch(paths.unitSpecsSrc, ['build-test']).on('change', reportChange);
});

/**
 * First compile main and test files, then start watching them and run karma. If any of main or test files changes,
 * they get recompiled and tests are rerun after that
 */
gulp.task('tdd', function (callback) {
  return runSequence('clean', ['build-system', 'build-test'], ['watch-system', 'watch-test', 'karma-continuous'], callback);
});

