var gulp = require('gulp');
var modules = require('../');

gulp.task('inject:modules', function() {
  return gulp.src(['./app.js'])
    .pipe(modules({name: 'myGlobalApp', modules: ['ui.router'], filter: ['will.remove']}))
    .pipe(gulp.dest('./dist'))
})