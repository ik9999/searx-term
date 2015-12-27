let path = require('path');
let gulp = require('gulp');
let fsJ = require('fs-jetpack');
let packageJson = require('../package.json');

let buildDir = path.join(__dirname, '..', 'build');
let resDir = path.join(__dirname, '..', 'release_res');
let releaseDir = path.join(__dirname, '..', 'release');
let releaseVersionDir = path.join(releaseDir, packageJson.version);
let releaseBuildDir = path.join(releaseVersionDir, 'dist');

let packageJsonPath = path.join(__dirname, '..', 'package.json');
let packageJsonReleasePath = path.join(releaseVersionDir, 'package.json');

gulp.task('createDirs', () => {
  fsJ.dir(releaseDir, {empty: true});
  fsJ.dir(releaseVersionDir, {empty: true});
  fsJ.dir(releaseBuildDir, {empty: true});
});

gulp.task('release', ['createDirs'], () => {
  fsJ.file(path.join(releaseVersionDir, 'run.sh'), {mode: '775'});
  fsJ.file(path.join(releaseVersionDir, 'setup.sh'), {mode: '775'});
  fsJ.copy(resDir, releaseVersionDir, {overwrite: true});
  fsJ.copy(buildDir, releaseBuildDir, {overwrite: true});
  fsJ.copy(packageJsonPath, packageJsonReleasePath, {overwrite: true});
});
