'use strict';

/**
 * default development task, same as "deafult" but run faster, don't builds
 */
const gulp = require('gulp');
const runSequence = require('run-sequence');

exports.task = () =>
	runSequence(
		['watch', 'server', 'nodemon']
	);