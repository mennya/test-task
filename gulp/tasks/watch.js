'use strict';

/**
 * watching file changes
 */
const gulp = require('gulp');
const g = require('gulp-load-plugins')();
const CONFIG = require('../config');

function change(file) {
	console.log('changed=' + file.path);
}

exports.task = () => {
	gulp.watch([CONFIG.PATHS.JS, CONFIG.PATHS.TS], ['dev-my-js'])
		.on('change', change);
	gulp.watch([CONFIG.PATHS.JADE], ['dev-jade'])
		.on('change', change);
	gulp.watch([CONFIG.PATHS.JADE_INDEX, 'client/app/core/layout/**/**.pug'], ['dev-jade-index'])
		.on('change', change);
	gulp.watch([CONFIG.PATHS.MY_CSS], ['dev-styl'])
		.on('change', change);
	gulp.watch([CONFIG.PATHS.SERVER], g.developServer.restart)
		.on('change', change);
};