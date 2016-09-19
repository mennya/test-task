'use strict';

const gulp = require('gulp');
const CONFIG = require('../config');

exports.task = () =>
	gulp.src(CONFIG.PATHS.CONFIG)
		.pipe(gulp.dest(CONFIG.PATHS.DIST));