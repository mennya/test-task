'use strict';

/**
 * STYLUS files
 */
const gulp = require('gulp');
const g = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const CONFIG = require('../config');

exports.task = () =>
	gulp.src(CONFIG.PATHS.MY_CSS)
		.pipe(g.plumber({errorHandler: CONFIG.onError}))
		.pipe(g.concatUtil('styl.js'))
		.pipe(g.stylus())
		.pipe(g.autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(g.cleanCss())
		.pipe(g.css2js())
		.pipe(gulp.dest(CONFIG.PATHS.DIST))
		.pipe(browserSync.reload(CONFIG.CONF.BROWSER_SYNC));