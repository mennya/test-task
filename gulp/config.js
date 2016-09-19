'use strict';

/**
 * gulp configuration
 */

var gulp = require('gulp');
var g = require('gulp-load-plugins')();
var env = require('../env.json');
const PATHS = {
	SERVER: 'server/**/*.js',
	CONFIG:'client/aconfig.js',
	JS: 'client/app/**/*.js',
	TS: 'client/app/**/*.ts',
	MY_CSS: 'client/app/**/*.styl',
	JADE: ['client/app/**/*.pug', '!client/app/layout/**', '!client/app/index.pug'],
	JADE_INDEX: 'client/app/index.pug',
	DIST: './dist/'
};
const CONF = {
	BROWSER_SYNC: {stream: true, once: true},
	PORT: 80,
	PROXY: 'http://localhost:' + env.PORT + '/'
};

exports.onError = onError;
exports.PATHS = PATHS;
exports.CONF = CONF;

function onError(err) {
	if ('TypeScript error' !== err.name)
		g.notify.onError({
			title: 'Gulp',
			subtitle: 'Failure!',
			message: 'Error: <%= error.message %>'
		})(err);

	this.emit('end');
}