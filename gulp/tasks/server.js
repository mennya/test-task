'use strict';

/**
 * static Server
 * @type {initSingleton}
 */
var browserSync = require('browser-sync');
const CONFIG = require('../config');

exports.task = () =>
	browserSync.init(null, {
		proxy: CONFIG.CONF.PROXY,
		port: CONFIG.CONF.PORT,
		open: true,
		notify: false,
		ghostMode: false,
		ui: false
	});