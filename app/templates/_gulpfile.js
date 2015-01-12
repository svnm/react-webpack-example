'use strict';
var gulp = require('gulp'),
  connect = require('connect'),
  livereload = require('gulp-livereload'),
  browserify = require('browserify'),
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

  var sourceFile = './app/scripts/main.js',
    destFile = 'app.js';

  var bundler = browserify({
    entries: sourceFile,
    cache: {}, packageCache: {}, fullPaths: true, debug: true
  });

  var bundle = function() {
    return bundler
      .bundle()
      .on('error', function () {})
      .pipe(source(destFile))
      .pipe(gulp.dest("./app/scripts/"));
  };

  return bundle();
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

/* extras */
gulp.task('extras', function () {
  return gulp.src([
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

/* connect */
gulp.task('connect', ['styles'], function () {
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
    gulp.start('browserify');
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

    gulp.watch('app/scripts/**/*.js', ['browserify']);
});

/* build */
gulp.task('build', ['images', 'styles','extras'], function () {
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