var gulp = require('gulp');
var buildElectron = require('gulp-electron');
var runElectron = require('gulp-run-electron');
var runSequence = require('run-sequence');
var fs = require('fs-extra');
var path = require('path');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var paths = require('../paths');
var config = require('../config');
var packageJson = require('../../package.json');

gulp.task('electron:prepare', function() {
  var node_modules = Object.keys(packageJson.dependencies).map(function(dep) {
    return 'node_modules/' + dep + '/**/*';
  });
  gulp.src([paths.outRoot + '/**/*', paths.style, 'package.json', 'config.js', 'main.js', 'index.html', 'jspm_packages/**/*']
      .concat(node_modules), {base: "."})
      .pipe(gulp.dest(paths.electronBuild));
});

gulp.task('electron:build', function() {
  gulp.src("")
    .pipe(buildElectron({
        src: paths.electronBuild,
        packageJson: packageJson,
        release: paths.electronRelease,
        cache: paths.electronCache,
        version: config.electronVersion,
        rebuild: false,
        platforms: config.electronPlatforms
    }))
    .pipe(gulp.dest(""));
})

gulp.task('electron:release', function(callback) {
  return runSequence(
    ['electron:clean', 'build'],
    'electron:prepare',
    'electron:build',
    callback
  );
});

gulp.task('electron:clean', function() {
  return gulp.src([paths.electronBuild, paths.electronRelease])
    .pipe(vinylPaths(del));
});

gulp.task('electron:run', ['watch'], function() {
  gulp.src(".").pipe(runElectron(["--dev"]));
});

gulp.task('electron', ['electron:run']);
