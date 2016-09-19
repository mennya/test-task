'use strict';

const gulp = require('gulp');
const fs = require('fs');
const TASKS_PATH = './gulp/tasks/';

// read in all files from gulp/tasks and create tasks for them
fs
	.readdirSync(TASKS_PATH)
	.map(filename => {
		return {
			name: filename.substr(0, filename.length - 3),
			contents: require(TASKS_PATH + filename)
		};
	})
	.forEach(file =>
		gulp.task(file.name, file.contents.dependencies, file.contents.task));