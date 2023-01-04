var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();
 
gulp.task('watch', function() {
	gulp.watch(['*','*/*'], ['default']);
 });
 
gulp.task('pack', function (done) {
  var json = require('./manifest.json');
  var latestVersion = json['version'];
  var zipName = "Anyway.Tab." + latestVersion + ".zip"

  gulp.src('builds/**')
    .pipe(plugins.archiver(zipName))
    .pipe(gulp.dest('dist'));
  done();    
});
 
gulp.task('default', function (done) {
     
	gulp.src('anyway.html')
		.pipe(gulp.dest('builds'));
		
	gulp.src('icons/*.png')
		.pipe(gulp.dest('builds/icons'));
		
	gulp.src('manifest.json')
		.pipe(gulp.dest('builds'));
		
	gulp.src(['js/*.js'])
		.pipe(plugins.uglify())
		// .pipe(plugins.batchReplace(cdnFile))
		.pipe(gulp.dest('builds/js'));
		
	gulp.src(['*.css'])
		.pipe(plugins.cleanCss())
		.pipe(gulp.dest('builds'));
  done();
});

