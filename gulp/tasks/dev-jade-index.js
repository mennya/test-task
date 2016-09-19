'use strict';

/**
 * converting index file from jade to html
 */
const gulp = require('gulp');
const g = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const CONFIG = require('../config');

exports.task = () => {
	const vendor = gulp.src('dist/vendor/*.js', {read: false});
	const dist = gulp.src('dist/*.js', {read: false});

	return gulp.src(CONFIG.PATHS.JADE_INDEX)
		.pipe(g.plumber({errorHandler: CONFIG.onError}))
		.pipe(g.inject(dist, {ignorePath: 'dist'}))
		.pipe(g.inject(vendor, {ignorePath: 'dist', name: 'vendor'}))
		.pipe(g.concatUtil('index.html'))
		.pipe(g.pug())
		.pipe(g.htmlmin({
			spare: true,
			empty: true,
			removeComments: true,
			minifyJS: true
		}))
		.pipe(gulp.dest(CONFIG.PATHS.DIST))
		.pipe(browserSync.reload(CONFIG.CONF.BROWSER_SYNC));
};