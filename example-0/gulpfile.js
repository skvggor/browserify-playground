var path = require('path'),
	gulp = require('gulp'),
	rename = require('gulp-rename'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	eventStream = require('event-stream'),
	buffer = require('vinyl-buffer'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	stylus = require('gulp-stylus'),
	minifyHTML = require('gulp-minify-html'),
	watch = require('gulp-watch'),
	connect = require('gulp-connect');

gulp.task('js', function() {
	var files = [
		'./assets/js/index.js'
	];

	var tasks = files.map(function(file) {
		return browserify({ entries: [file] })
			.bundle()
			.pipe(source(path.basename(file)))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(uglify())
			.pipe(rename({ suffix: '-bundle' }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./public/assets/js'))
			.pipe(connect.reload());
	});

	return eventStream.merge.apply(null, tasks);
});

gulp.task('css', function() {
	return gulp.src('./assets/stylus/styles.styl')
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(stylus({ compress: true }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/assets/css'))
		.pipe(connect.reload());
});

gulp.task('html', function() {
	return gulp.src('./*.html')
		.pipe(minifyHTML())
		.pipe(gulp.dest('./public'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('./assets/js/*.js', ['js']);
	gulp.watch('./assets/stylus/*.styl', ['css']);
	gulp.watch('./*.html', ['html']);
});

gulp.task('connect', function() {
	connect.server({
		root: './public',
		livereload: true
	});
});

// todo: plugin!
var gulpTasks = function() {
	var gulpTasks = gulp.tasks,
		tasks = [];

	for (var task in gulpTasks) {
		tasks.push(task);
	}

	return tasks;
};

gulp.task('default', gulpTasks());
