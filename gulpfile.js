var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();
 
var cdnFile = [
	[
		"./json/anyway.tab.json",
		"http://jjying-1253470762.cossh.myqcloud.com/anyway.tab.json" 
	]
];
 
gulp.task('watch', function() {
	gulp.watch(['*','*/*'], ['default']);
 });
 
gulp.task('pack', function (done) {
  var json = require('./manifest.json');
  var latestVersion = json['version'];
  var zipName = "Anyway.Tab." + latestVersion + ".zip"

  gulp.src('builds/**')
    .pipe(plugins.archiver(zipName))
    .pipe(gulp.dest('Releases'));
  done();    
});
 
gulp.task('default', function (done) {
     
	gulp.src('anyway.html')
		.pipe(gulp.dest('builds'));
		
	gulp.src('icons/*.png')
		.pipe(gulp.dest('builds/icons'));
	
	gulp.src('json/anyway.tab.json')
		.pipe(plugins.jsonMinify())
		.pipe(gulp.dest('builds/json'))
		.pipe(plugins.rename('local.json'))
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
  done();
});

