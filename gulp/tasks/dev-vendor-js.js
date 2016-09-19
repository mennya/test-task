'use strict';

const gulp = require('gulp');
const g = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const mainBowerFiles = require('main-bower-files');
const CONFIG = require('../config');

// сборка js файлов вендорных библиотек для разработки без минификации
exports.task = () =>
	gulp.src(mainBowerFiles())
		.pipe(g.plumber({errorHandler: CONFIG.onError}))
		.pipe(g.filter(['**/**.js']))

		// .pipe(g.notify('<%= file.relative %>!'))
		.pipe(g.concatUtil('vendor.js'))
		.pipe(g.ngAnnotate())
		.pipe(gulp.dest(CONFIG.PATHS.DIST + '/vendor'))
		.pipe(browserSync.reload(CONFIG.CONF.BROWSER_SYNC));