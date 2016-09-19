'use strict';

/**
 * converting index file from jade to html
 */
const gulp = require('gulp');
const g = require('gulp-load-plugins')();
const CONFIG = require('../config');

exports.task = () =>
	gulp.src(CONFIG.PATHS.JADE_INDEX)
		.pipe(g.inject(gulp.src('dist/*.js', {read: false}), {ignorePath: 'dist'}))
		.pipe(g.concatUtil('index.html'))
		.pipe(g.pug())
		.pipe(g.htmlmin({
			spare: true,
			empty: true,
			removeComments: true,
			minifyJS: true
		}))
		.pipe(gulp.dest(CONFIG.PATHS.DIST));