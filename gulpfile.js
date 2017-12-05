var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var removeHtmlComments  = require('gulp-remove-html-comments');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var concat = require('gulp-concat');

// Project folders config
var config = {
  destDir: './dist' /* répértoire de destination (prod) */
}

// Task to build JS files
gulp.task('build-js', function(){
 return browserify('dev/app/app.js',{
    debug: true
  })
  .transform(babelify.configure({
    presets : ['env']
  }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(config.destDir + '/js'))
  .pipe(reload({stream:true}));
});

// Task to remove comments from html files and move them to dest folder
gulp.task('copy-html', function(){
  return gulp.src(['./dev/www/*.html'])
  .pipe(removeHtmlComments())
  .pipe(gulp.dest(config.destDir))
  .pipe(reload({stream:true}));
});

// Copy static files from dev/src folder (but not bower_components) to build folders in dist/src folder
gulp.task('copy-static', function(){
    return gulp.src(['./dev/src/**/*.*', '!./dev/src/css{,/**}', '!./dev/src/bower_components{,/**}'])
    .pipe(gulp.dest(config.destDir + '/src'))
    .pipe(reload({stream:true}));
});

gulp.task('js-deps', function(){
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/materialize-css/dist/js/materialize.min.js'
  ])
  .pipe(concat('js-deps.js'))
  .pipe(gulp.dest(config.destDir + '/js'));
});

gulp.task('css-deps', function(){
  return gulp.src([
    'node_modules/materialize-css/dist/css/materialize.min.css',
    './dev/src/css/*.*'
  ])
  .pipe(concat('style.css'))
  .pipe(gulp.dest(config.destDir + '/src/css'))
  .pipe(reload({stream:true}));
});

gulp.task('fonts-deps', function(){
  return gulp.src([
    'node_modules/materialize-css/dist/fonts/**/*.*'
  ])
  .pipe(gulp.dest(config.destDir + '/src/fonts'));
});

// Task to run local server
gulp.task('startServer',  function() {
  browserSync.init({
    server: {
        baseDir: config.destDir
    },
    notify: true
  });
});

// Task to watch wich file is changing and load the right task
gulp.task('watch', function() {
  // watch js file changes
  gulp.watch('./dev/app/**/*.js', ['build-js']); 
  // watch all html template file changes
  gulp.watch('./dev/**/*.html', ['copy-html']); 
  // watch css
  gulp.watch('./dev/src/css/*.*', ['css-deps']); 
  // watch static files
  gulp.watch(['./dev/src/**/*.*', '!./dev/src/css/*.*', '!./dev/src/bower_components{,/**}'], ['copy-static']); 
});

// Default task. This will be run when no task is passed in arguments to $ gulp
gulp.task('run',[
  'build-js',
  'copy-html',
  'copy-static',
  'js-deps',
  'css-deps',
  'fonts-deps'
]);
gulp.task('default', ['run'], function() {
  gulp.start('startServer', 'watch');
  // restart Gulp watch if new file added
  gulp.watch('src/**/*', {cwd: './dev/'}, function(event) {
    if (event.type === 'added') {
      setTimeout(function() {
        gulp.start('watch');
      }, 1000);
    }
  });
});
