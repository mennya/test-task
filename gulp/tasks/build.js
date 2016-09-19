'use strict';

/**
 * build project for production
 */
const gulp = require('gulp');
const g = require('gulp-load-plugins')();
const CONFIG = require('../config');
const mainBowerFiles = require('main-bower-files');
const runSequence = require('run-sequence');

gulp.task('bowerFiles', () => {
	return gulp.src(mainBowerFiles())
		.pipe(g.filenames('bower'));
});

gulp.task('myFiles', () => {
	return gulp.src('client/app/**/*')
		.pipe(g.filenames('bower'));
});

gulp.task('main', () => {

	const vendorCssFilter = g.filter('bower_components/**/*.css', {restore: true});
	const vendorJsFilter = g.filter('bower_components/**/*.js', {restore: true});
	const myStylFilter = g.filter(CONFIG.PATHS.MY_CSS, {restore: true});
	const myJsFilter = g.filter(CONFIG.PATHS.JS, {restore: true});
	const myTsFilter = g.filter(CONFIG.PATHS.TS, {restore: true});
	const myJadeFilter = g.filter('client/app/**/*.pug', {restore: true});

	return gulp.src(g.filenames.get('bower', 'full'))
	// .pipe(g.plumber({errorHandler: CONFIG.onError}))

	// STYLE====================================================
		.pipe(myStylFilter)
		.pipe(g.stylus())
		.pipe(g.autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(g.cssnano({discardUnused: false, keepSpecialComments: 0}))
		.pipe(g.css2js())
		.pipe(myStylFilter.restore)

		// VENDOR CSS================================================
		.pipe(vendorCssFilter)
		.pipe(g.cssnano({
			discardUnused: false,
			keepSpecialComments: 0,
			discardComments: {removeAll: true}
		}))
		.pipe(g.css2js())
		.pipe(vendorCssFilter.restore)

		.pipe(myTsFilter)
		// .pipe(g.typescript())
		.pipe(myTsFilter.restore)

		// MY JS=================================================
		.pipe(myJsFilter)
		.pipe(g.angularFilesort())
		.pipe(g.iife({
			useStrict: false,
			trimCode: true,
			prependSemicolon: false,
			bindThis: false
		}))
		.pipe(g.ngAnnotate())
		.pipe(g.concatUtil('app.js'))
		.pipe(g.iife({
			useStrict: true,
			trimCode: true,
			prependSemicolon: false,
			bindThis: false,
			params: ['window', 'angular', 'undefined'],
			args: ['window', 'window.angular']
		}))
		.pipe(myJsFilter.restore)

		// VENDOR JS=================================================
		.pipe(vendorJsFilter)
		// .pipe(g.debug())
		.pipe(g.ngAnnotate())
		.pipe(vendorJsFilter.restore)

		// JADE======================================================
		.pipe(myJadeFilter)
		.pipe(g.pug())
		.pipe(g.htmlmin({
			spare: true,
			empty: true,
			removeComments: true
		}))
		.pipe(g.angularTemplatecache({
			module: 'agg',
			transformUrl: function (templateUrl) {
				var arr = templateUrl.split('/');

				return arr[arr.length - 1];
			}
		}))
		.pipe(g.iife({
			useStrict: true,
			trimCode: true,
			prependSemicolon: false,
			bindThis: false,
			params: ['window', 'angular', 'undefined'],
			args: ['window', 'window.angular']
		}))
		.pipe(myJadeFilter.restore)

		.pipe(g.concatUtil('app.js'))
		.pipe(g.uglify())
		.pipe(gulp.dest(CONFIG.PATHS.DIST))

		.pipe(g.gzip({append: true}))
		.pipe(gulp.dest(CONFIG.PATHS.DIST));

});

exports.task = () => gulp.task('build', () =>
	runSequence(['clear', 'bowerFiles'],
		'myFiles',
		'config',
		'main',
		'jade-index'
	));