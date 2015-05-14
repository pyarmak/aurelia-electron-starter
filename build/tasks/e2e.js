var gulp = require('gulp');
var paths = require('../paths');
var plumber = require('gulp-plumber');
var webdriver_update = require('gulp-protractor').webdriver_update;
var protractor = require("gulp-protractor").protractor;
var ts = require('gulp-typescript');

var tsProject = ts.createProject({
  typescript: require('typescript'),
  declarationFiles: false,
  noExternalResolve: true,
  target: 'ES5',
  module: 'commonjs',
  emitDecoratorMetadata: true
});


// for full documentation of gulp-protractor,
// please check https://github.com/mllrsohn/gulp-protractor
gulp.task('webdriver_update', webdriver_update);

// then copies them to dist/e2e/dist/
gulp.task('build-e2e', function () {
  var tsResult = gulp.src([paths.e2eSpecsSrc, paths.dtsSource])
    .pipe(ts(tsProject));
  return tsResult.js
    .pipe(gulp.dest(paths.e2eSpecsDist));
});

// runs build-e2e task
// then runs end to end tasks
// using Protractor: http://angular.github.io/protractor/
gulp.task('e2e', ['webdriver_update', 'build-e2e'], function(cb) {
  return gulp.src(paths.e2eSpecsDist + "/*.js")
    .pipe(protractor({
        configFile: "protractor.conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:9000']
    }))
    .on('error', function(e) { throw e; });
});
