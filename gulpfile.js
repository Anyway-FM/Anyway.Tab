var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();
 
var jsAll = [
	[
		"<script src='./js/jquery.min.js'></script><script src='./js/jquery-dateFormat.min.js'></script><script src='./js/main.js'></script>",
		"<script src='all.js'></script>" 
	]
];
 
gulp.task('watch', function() {
	gulp.watch(['*','*/*'], ['default']);
 });
 
 
gulp.task('default', function() {

	gulp.src('anyway.html')
		.pipe(plugins.batchReplace(jsAll))
		.pipe(gulp.dest('build'));
		
	gulp.src('icons/*.png')
		.pipe(gulp.dest('build/icons'));
		
	gulp.src('json/local-quotes.json')
		.pipe(gulp.dest('build/json'));
		
	gulp.src('manifest.json')
		.pipe(gulp.dest('build'));
		
	gulp.src(['js/*.js'])
		.pipe(plugins.uglify())
		.pipe(plugins.concat('all.js'))
		.pipe(gulp.dest('build'));
		
	gulp.src(['*.css'])
		.pipe(plugins.cleanCss())
		.pipe(gulp.dest('build'));     
});

