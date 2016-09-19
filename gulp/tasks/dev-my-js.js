'use strict';

const gulp = require('gulp');
const g = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const CONFIG = require('../config');

// сборка js файлов для разработки(т.е. без минификации)
exports.task = () => {
	const jsFilter = g.filter(CONFIG.PATHS.JS, {restore: true});
	const tsFilter = g.filter(CONFIG.PATHS.TS, {restore: true});

	return gulp.src([CONFIG.PATHS.JS, CONFIG.PATHS.TS])
		.pipe(g.plumber({errorHandler: CONFIG.onError}))
		.pipe(tsFilter)
		.pipe(tsFilter.restore)
		.pipe(jsFilter)
		.pipe(g.angularFilesort())
		.pipe(g.iife({
			useStrict: true,
			trimCode: true,
			prependSemicolon: false,
			bindThis: false,
			params: ['window', 'angular', 'undefined'],
			args: ['window', 'window.angular']
		}))
		.pipe(g.ngAnnotate())
		.pipe(g.concatUtil('app.js'))
		.pipe(gulp.dest(CONFIG.PATHS.DIST))
		.pipe(browserSync.reload(CONFIG.CONF.BROWSER_SYNC));
};