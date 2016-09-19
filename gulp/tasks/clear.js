'use strict';

/**
 * clears dist dir
 */
const gulp = require('gulp');
const CONFIG = require('../config');
const del = require('del');

exports.task = () => gulp.task('clear', () => del(CONFIG.PATHS.DIST));