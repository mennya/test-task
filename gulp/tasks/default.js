'use strict';

/**
 * default development task, builds, watching files, lunches server etc..
 */
const gulp = require('gulp');
const runSequence = require('run-sequence');

exports.task = () => gulp.task('default', () => {

	runSequence('clear',
		[
			'dev-my-js',
			'dev-styl',
			'dev-vendor-css',
			'dev-vendor-js',
			'dev-jade'
		],
		'config',
		'dev-jade-index',
		['watch', 'server', 'nodemon']
	);

});