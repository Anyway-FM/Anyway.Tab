var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();
 
var cdnFile = [
	[
		"./json/anyway.quote.json",
		"http://anyway-web.b0.upaiyun.com/anyway.quote/anyway.quote.json" 
	]
];
 
gulp.task('watch', function() {
	gulp.watch(['*','*/*'], ['default']);
 });
 
 
gulp.task('default', function() {

	gulp.src('anyway.html')
		.pipe(gulp.dest('build'));
		
	gulp.src('icons/*.png')
		.pipe(gulp.dest('build/icons'));
		
	gulp.src('json/local-quotes.json')
		.pipe(gulp.dest('build/json'));
		
	gulp.src('manifest.json')
		.pipe(gulp.dest('build'));
		
	gulp.src(['js/*.js'])
		.pipe(plugins.uglify())
		.pipe(plugins.batchReplace(cdnFile))
		.pipe(gulp.dest('build/js'));
		
	gulp.src(['*.css'])
		.pipe(plugins.cleanCss())
		.pipe(gulp.dest('build'));     
});

