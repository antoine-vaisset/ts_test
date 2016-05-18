'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    Config = require('./gulpfile.config'),
    tsProject = tsc.createProject('tsd.json'),
    browserSync = require('browser-sync'),
    superstatic = require( 'superstatic' ),
    sass = require('gulp-sass');

var config = new Config();

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
// gulp.task('gen-ts-refs', function () {
//     var target = gulp.src(config.appTypeScriptReferences);
//     var sources = gulp.src([config.allTypeScript], {read: false});
//     return target.pipe(inject(sources, {
//         starttag: '//{',
//         endtag: '//}',
//         transform: function (filepath) {
//             return '/// <reference path="../..' + filepath + '" />';
//         }
//     })).pipe(gulp.dest(config.typings));
// });

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
});

gulp.task('vendors-task', function () {
    var target = gulp.src('./views/home/index.cshtml');

    var vendorStream = gulp.src(['./bower_components/angular-route/angular-route.js',
                                 './bower_components/angular/angular.js',
                                 './bower_components/bootstrap/dist/js/bootstrap.js',
                                 './bower_components/jquery/dist/jquery.js']);

    return target
        .pipe(inject(
            vendorStream.pipe(print())
                        .pipe(angularFilesort())
                        .pipe(concat('vendors.js'))
                        .pipe(gulp.dest('.build/vendors')), { name: 'vendors' }))
        .pipe(gulp.dest('./views/home/'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions]; //reference to library .d.ts files
                        

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc(tsProject));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
  var typeScriptGenFiles = [
                              config.tsOutputPath +'/**/*.js',    // path to all JS files auto gen'd by editor
                              config.tsOutputPath +'/**/*.js.map', // path to all sourcemap files auto gen'd by editor
                              '!' + config.tsOutputPath + '/lib'
                           ];

  // delete the files
  del(typeScriptGenFiles, cb);
});

gulp.task('sass', function () {
  return gulp.src(config.allSass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.cssOutputPath));
});

gulp.task('sass:watch', function () {
  gulp.watch(config.allSass, ['sass']);
});


gulp.task('index', function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./dist/js/*.js', './dist/css/*.css'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./dist'));
});

gulp.task('index:watch', function () {
  gulp.watch('./src/index.html', ['index']);
});

gulp.task('watch', function() {
    gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts']);
});

gulp.task('serve', ['compile-ts', 'watch', 'sass', 'index', 'sass:watch', 'index:watch'], function() {
  process.stdout.write('Starting browserSync and superstatic...\n');
  browserSync({
    port: 3000,
    files: ['**'],
    injectChanges: true,
    logFileChanges: false,
    logLevel: 'silent',
    logPrefix: 'angularin20typescript',
    notify: true,
    reloadDelay: 0,
    server: {
      baseDir: './dist',
      middleware: superstatic({ debug: false})
    }
  });
});

gulp.task('default', ['ts-lint', 'compile-ts']);