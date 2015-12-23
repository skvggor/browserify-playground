var path = require('path'),
	gulp = require('gulp'),
	rename = require('gulp-rename'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	eventStream = require('event-stream'),
	buffer = require('vinyl-buffer'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	stylus = require('gulp-stylus');
	minifyHTML = require('gulp-minify-html');

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
			.pipe(gulp.dest('./public/assets/js'));
	});

	return eventStream.merge.apply(null, tasks);
});

gulp.task('css', function() {
	return gulp.src('./assets/stylus/styles.styl')
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(stylus({ compress: true }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/assets/css'));
});

gulp.task('html', function() {
	return gulp.src('./*.html')
		.pipe(minifyHTML())
		.pipe(gulp.dest('./public'));
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
