'use strict';

const gulp = require('gulp');
const g = require('gulp-load-plugins')();
const mainBowerFiles = require('main-bower-files');
const CONFIG = require('../config');

// стили сторонних библиотек
exports.task = () =>
	gulp.src(mainBowerFiles({base: '../bower_components'}))
		.pipe(g.plumber({errorHandler: CONFIG.onError}))
		.pipe(g.filter(['**/**.css']))
		.pipe(g.concatUtil('bundle.css'))
		.pipe(g.cleanCss())
		.pipe(g.css2js())
		.pipe(gulp.dest(CONFIG.PATHS.DIST + '/vendor'));