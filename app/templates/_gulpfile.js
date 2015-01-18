'use strict';
var gulp = require('gulp'),
  connect = require('connect'),
  livereload = require('gulp-livereload'),
  browserify = require('browserify'),
  reactify = require('reactify'),
  watchify = require('watchify'),
  source = require('vinyl-source-stream'),
  less = require('gulp-less'),
  rubySass = require('gulp-ruby-sass'),
  plumber = require('gulp-plumber'),
  autoprefixer = require('gulp-autoprefixer'),
  cache = require('gulp-cache'),
  jshint = require('gulp-jshint'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  minifyHtml = require('gulp-minify-html'),
  size = require('gulp-size'),
  serveStatic = require('serve-static'),
  serveIndex = require('serve-index');

/* browserify */ 
gulp.task('browserify', function() {

  var bundler = browserify({
        entries: ['./app/scripts/main.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // Convert JSX to normal javascript
        debug: true, cache: {}, packageCache: {}, fullPaths: true
    });

    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () { // When any files updates
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle()
        .pipe(source('app.js'))
        // This is where you add uglifying etc.
        .pipe(gulp.dest('./app/scripts/'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle() // Create the initial bundle when starting the task 
    .pipe(source('app.js'))
    .pipe(gulp.dest('./app/scripts/'));
});


/* styles */
gulp.task('styles', function () { 
  <%  if (cssFramework === 'SASS') { %>
  return gulp.src('app/styles/main.scss')
    .pipe(plumber())
    .pipe(rubySass({
      style: 'expanded',
      precision: 10
    }))
    .pipe(autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('app/styles/')); <% } %>

  <%  if (cssFramework === 'LESS') { %>
  return gulp.src('app/styles/main.less')
    .pipe(plumber())
    .pipe(less({
      style: 'expanded',
      precision: 10
    }))
    .pipe(autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('app/styles')); <% } %>

});


/* js hint */
gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


/* images */
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});


/* connect */
gulp.task('connect', ['styles', 'browserify'], function () {
  var app = connect()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('app'))
    .use(serveIndex('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});


/* serve */
gulp.task('serve', ['watch'], function () {
    require('opn')('http://localhost:9000');
});


/* watch */
gulp.task('watch', ['connect'], function () {

  livereload.listen();

  gulp.watch([
    'app/*.html',
    'app/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*'
  ]).on('change', livereload.changed);

  <% if (cssFramework === 'SASS') { %>
    gulp.watch('app/styles/**/*.scss', ['styles']); <% } %>
  <% if (cssFramework === 'LESS') { %>
    gulp.watch('app/styles/**/*.less', ['styles']); <% } %>
});


/* build */
gulp.task('build', ['images', 'styles'], function () {
  gulp.start('browserify');

  /* app */
  gulp.src('app/**/*')
    .pipe(gulp.dest('dist'))
    .pipe(size({title: 'build', gzip: true}));

  /* html */
  var opts = {comments:true,spare:true, quotes: true};
  gulp.src('dist/*.html')
    .pipe(minifyHtml(opts))
    .pipe(gulp.dest('dist'));    
});

/* default */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});