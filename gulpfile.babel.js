'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';

import concat from 'gulp-concat';
import rename from 'gulp-rename';

import size from 'gulp-size';
import bump from 'gulp-bump';
import git from 'gulp-git';

import jshint from 'gulp-jshint';
import mocha from 'gulp-mocha';
import clean from 'gulp-clean';
import header from 'gulp-header';

import pump from 'pump';

import uglify from 'uglify-js';
import minifier from 'gulp-uglify/minifier';
import resolveDependencies from 'gulp-resolve-dependencies';


var uglifyjs = require('uglify-js'); // can be a git checkout
                                     // or another module (such as `uglify-js-harmony` for ES6 support)


import pkg from './package.json';

const dirs = {
  src: 'src',
  dest: 'dist',
  test: 'test'
};

const extended = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

const succint = '// <%= pkg.name %>@v<%= pkg.version %>, <%= pkg.license %> licensed. <%= pkg.homepage %>\n';

const options = {
  preserveComments: 'license'
}

/*
* Releasing to the wild
*/
gulp.task('bump', function () {
  return pump([
    gulp.src(['./package.json'/*, './bower.json'*/]),
    bump(),
    gulp.dest('./')
  ]);
});

gulp.task('tag', ['bump'], function () {
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  return pump([
    gulp.src('./'),
    git.commit(message),
    git.tag(v, message),
    git.push('origin', 'master', '--tags'),
    gulp.dest('./')
  ]);
});

gulp.task('npm', ['tag'], function (done) {
  require('child_process').spawn('npm', ['publish'], { stdio: 'inherit' })
    .on('close', done);
});


/*
* House cleaning and testing
*/
gulp.task('lint', () => {
  return pump([
    gulp.src('./src/*.js'),
    jshint('.jshintrc'),
    jshint.reporter('jshint-stylish')
  ]);
});

gulp.task('mocha', () => {
//  return pump([
//    gulp.src( dirs.test +'/**/*.js'),
//    mocha({ reporter: 'list', timeout: 60000  })
//  ]);

    return gulp.src( dirs.test +'/**/*.js')
      .pipe(mocha({ reporter: 'list', timeout: 60000  }))
      .once('error', (e) => {
        console.log('ERROR %s', e);
        process.exit(1);
      })
      .once('end', () => {
        console.log('end');
        process.exit();
      });
});

gulp.task('clean:build', () => {
  return pump([
    gulp.src(dirs.dest, { read: false }),
    clean()
  ]);
});

gulp.task('copy:build', ['clean:build'], () => {
  return pump([
    gulp.src([dirs.src+'/**/*.json'], {
      base: dirs.src
    }),
    gulp.dest(dirs.dest)
  ]);
});

gulp.task('build', ['test','copy:build'], () => {
//gulp.task('build', ['copy:build'], () => {
  return pump([
    gulp.src(dirs.src+'/**/*.js', { base: dirs.src }),
    babel({presets: ['es2015','stage-0']}),
    header(extended, { pkg : pkg } ),
    size(),
    gulp.dest(dirs.dest)
//    resolveDependencies({
//      pattern: /\* @require [\s-]*(.*?\.js)/g,
//      log: true
//    }),
//    concat(pkg.name + '.min.js'),
//    minifier(options, uglify),
//    header(succint, { pkg : pkg } ),
//    size(),
//    gulp.dest(dirs.dest),
  ]);
});

gulp.task('test', ['lint', 'mocha']);
//gulp.task('test', ['lint']);

gulp.task('ci', ['build']);
gulp.task('release', ['npm']);

gulp.task('default', () => {
    console.log('CEPP internet:bangbang:');
});
