let path = require('path');
let gulp = require('gulp');
let fsJ = require('fs-jetpack');
let packageJson = require('../package.json');

let buildDir = path.join(__dirname, '..', 'build');
let resDir = path.join(__dirname, '..', 'release_res');
let nodeModulesDir = path.join(__dirname, '..', 'node_modules');
let releaseDir = path.join(__dirname, '..', 'release');
let releaseVersionDir = path.join(releaseDir, packageJson.version);
let releaseBuildDir = path.join(releaseVersionDir, 'dist');
let releaseNodeModulesDir = path.join(releaseVersionDir, 'node_modules');

gulp.task('createDirs', () => {
  fsJ.dir(releaseDir, {empty: true});
  fsJ.dir(releaseVersionDir, {empty: true});
  fsJ.dir(releaseBuildDir, {empty: true});
  fsJ.dir(releaseNodeModulesDir, {empty: true});
});

gulp.task('release', ['createDirs'], () => {
  fsJ.file(path.join(releaseVersionDir, 'run.sh'), {mode: '775'});
  fsJ.copy(resDir, releaseVersionDir, {overwrite: true});
  fsJ.copy(buildDir, releaseBuildDir, {overwrite: true});
  Object.keys(packageJson.dependencies).forEach(moduleName => {
    fsJ.copy(path.join(nodeModulesDir, moduleName), path.join(releaseNodeModulesDir, moduleName), {overwrite: true});
  });
});
