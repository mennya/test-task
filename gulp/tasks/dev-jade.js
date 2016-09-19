'use strict';

/**
 * converting jade to thml to js partials
 */
const gulp = require('gulp');
const g = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const CONFIG = require('../config');

exports.task = () =>
	gulp.src(CONFIG.PATHS.JADE)
		.pipe(g.plumber({errorHandler: CONFIG.onError}))
		.pipe(g.pug())
		.pipe(g.htmlmin({
			spare: true,
			empty: true,
			removeComments: true
		}))
		.pipe(g.angularTemplatecache({
			module: 'agg',
			transformUrl: function (templateUrl) {
				var arr = templateUrl.split('\\');

				return arr[arr.length - 1];
			}
		}))
		.pipe(g.concatUtil('partials.js'))
		.pipe(g.iife({
			useStrict: true,
			trimCode: true,
			prependSemicolon: false,
			bindThis: false,
			params: ['window', 'angular', 'undefined'],
			args: ['window', 'window.angular']
		}))
		.pipe(gulp.dest(CONFIG.PATHS.DIST))
		.pipe(browserSync.reload(CONFIG.CONF.BROWSER_SYNC));