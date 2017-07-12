var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();
 
var cdnFile = [
	[
		"./json/anyway.quote.json",
		"http://jjying-1253470762.cossh.myqcloud.com/anyway.quote/anyway.quote.json" 
	]
];
 
gulp.task('watch', function() {
	gulp.watch(['*','*/*'], ['default']);
 });
 
 
gulp.task('default', function() {

	gulp.src('anyway.html')
		.pipe(gulp.dest('builds'));
		
	gulp.src('icons/*.png')
		.pipe(gulp.dest('builds/icons'));
	
	gulp.src('json/anyway.quote.json')
		.pipe(plugins.jsonMinify())
		.pipe(gulp.dest('builds/json'))
		.pipe(plugins.rename('local-quotes.json'))
		.pipe(gulp.dest('builds/json'));		
		
		
	gulp.src('manifest.json')
		.pipe(gulp.dest('builds'));
		
	gulp.src(['js/*.js'])
		.pipe(plugins.uglify())
		.pipe(plugins.batchReplace(cdnFile))
		.pipe(gulp.dest('builds/js'));
		
	gulp.src(['*.css'])
		.pipe(plugins.cleanCss())
		.pipe(gulp.dest('builds'));     
});

