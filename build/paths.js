var path = require('path');

var appRoot  = 'src/app/';
var testRoot = 'src/test/';
var outRoot  = 'dist/';

module.exports = {
  root:   appRoot,
  source: appRoot + '**/*.ts',
  html:   appRoot + '**/*.html',
  electronCache:  './electron/cache',
  electronBuild:   './electron/build',
  electronRelease: './electron/release',
  dtsSource: 'dts/**/*.ts',
  style: 'styles/**/*.css',
  doc:'./doc',
  outRoot: outRoot,
  output: outRoot + 'app/',
  sourceMapRelativePath: '/' + appRoot,

  unitSpecsSrc:  testRoot + 'unit/**/*.ts',
  unitSpecsDist: outRoot  + '',

  e2eSpecsSrc:   testRoot + 'e2e/**/*.ts',
  e2eSpecsDist:  outRoot  + 'e2e/dist/'
};
