var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var jade        = require('gulp-jade')
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');


// F R O M ShakyShane
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});


// F R O M --- BROWSER SYNC WEB
// Static Server + watching scss/html files
// THIS SERVES your VARs ON THE BEGINNING OF THIS SCRIPT
gulp.task('serve', function() {

    browserSync.init({
        server: "_site"
    });

    // gulp.watch("assets/css/**/*.sass", ['sass']);
    // gulp.watch("assets/css/**/*.scss", ['sass']);
    // gulp.watch("_jade/**/*.jade", ['jade']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("assets/img/**").on('change', browserSync.reload);
    gulp.watch("assets/js/**").on('change', browserSync.reload);
    gulp.watch("assets/css/**").on('change', browserSync.reload);
    gulp.watch("_include/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
// F R O M ShakyShane
gulp.task('sass', function() {
  return gulp.src('assets/css/_style/style.sass')
      .pipe(sass( {
              // includePaths: ['scss'],
              outputStyle: 'compressed',
              onError: browserSync.notify
          }))
      .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe(gulp.dest('_site/assets/css'))
      .pipe(gulp.dest('assets/css'))
      .pipe(browserSync.reload({stream:true}))
});

// F R O M TravisNeilson
gulp.task('jade', function(){
  return gulp.src('_jade/*.jade')
      .pipe(jade({
            pretty: false,  // uncompressed
        }))
      .pipe(gulp.dest('_includes'))

})

// F R O M ShakyShane -- THIS WATCHES your VARs ON THE BEGINNING OF THIS SCRIPT
/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {


  gulp.watch("assets/css/**/*.sass", ['sass']);
  gulp.watch(['*.html', '_layouts/*.html', '_posts/*' , '_portfolio/*' , '_includes/*', 'assets/img', 'assets/script/**', 'assets/css/*.sass'], ['jekyll-rebuild']);
  gulp.watch("_jade/**/*.jade", ['jade']);

});


gulp.task('default', ['serve', 'watch']);
