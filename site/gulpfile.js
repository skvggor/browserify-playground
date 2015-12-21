var path = require('path'),
	gulp = require('gulp'),
	rename = require('gulp-rename'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	eventStream = require('event-stream'),
	buffer = require('vinyl-buffer'),
	uglify = require('gulp-uglify'),
	stylus = require('gulp-stylus');

gulp.task('js', function() {
	var files = [

		'./assets/js/index.js'

	];

	var tasks = files.map(function(file) {
		return browserify({ entries: [file] })
			.bundle()
			.pipe(source(path.basename(file)))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(rename({ suffix: '-bundle' }))
			.pipe(gulp.dest('./assets/js/dist'));
	});

	return eventStream.merge.apply(null, tasks);
});

gulp.task('css', function() {
	gulp.src('./assets/stylus/styles.styl')
		.pipe(stylus({ compress: true }))
		.pipe(gulp.dest('./assets/css/dist'));
});
