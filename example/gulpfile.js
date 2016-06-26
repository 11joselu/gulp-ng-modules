var gulp = require('gulp');
var modules = require('../');

gulp.task('inject:modules', function() {
  return gulp.src(['./app.js'])
    .pipe(modules({
      name: 'myGlobalApp', 
      modules: ['ui.router'], 
      filter: ['will.remove'],
      transform: function(list, options) {
         
          return 'angular.module(\''+ options.name +'\', [\''+ list.join("', '")+'\'])'
        }}))
    .pipe(gulp.dest('./dist'))
})