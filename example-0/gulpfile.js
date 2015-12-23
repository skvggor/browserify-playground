var path = require('path'),
	gulp = require('gulp'),
	rename = require('gulp-rename'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	eventStream = require('event-stream'),
	buffer = require('vinyl-buffer'),
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
			.pipe(uglify())
			.pipe(rename({ suffix: '-bundle' }))
			.pipe(gulp.dest('./public/assets/js'));
	});

	return eventStream.merge.apply(null, tasks);
});

gulp.task('css', function() {
	return gulp.src('./assets/stylus/styles.styl')
		.pipe(stylus({ compress: true }))
		.pipe(gulp.dest('./public/assets/css'));
});

gulp.task('html', function() {
	return gulp.src('./*.html')
		.pipe(minifyHTML())
		.pipe(gulp.dest('./public'));
});

gulp.task('default', [
	'js',
	'css',
	'html'
]);
