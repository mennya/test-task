'use strict';

/**
 * watching server files change
 */
const g = require('gulp-load-plugins')();
const env = require('../../env.json');

exports.task = () =>
	g.developServer
		.listen({
			path: './server/index.js',
			env: env
		});