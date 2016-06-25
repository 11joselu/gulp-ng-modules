# Gulp Angular Module injection
[![NPM version](https://badge.fury.io/js/gulp-ng-modules.svg)](https://npmjs.org/package/gulp-ng-modules)
[![Build Status](https://travis-ci.org/11joselu/gulp-ng-modules.svg?branch=master)](https://travis-ci.org/11joselu/gulp-ng-modules/)
> Angular.js module dependency injection.

### How it works?

It inject into a main module file that requires all your modules as a dependency. 

### Supports
- Adding a new module
- Removing a module
- 3rd party modules
- Supports data entry:
    - example-1.js
    ```javascript
        angular.module('myGlobalApp', []);
    ```
    - example-2.js
    ```javascript
        (function() {
            'use strict';

            angular.module('myGlobalApp', ['myModule'])
        })()
    ```
    - example-3.js
    ```javascript
        (function() {
            'use strict';

            angular.module('myGlobalApp', [
            'myModule'
            ])
        })()
    ```

## How to install

```npm install gulp-ng-modules --save-dev```

## Usage
```javascript
var gulp = require('gulp');
var ngModules = require('gulp-ng-modules');

gulp.task('inject:modules', function() {
  return gulp.src(['./app.js'])
    .pipe(ngModules({name: 'myGlobalApp'}))
    .pipe(gulp.dest('./dist'))
})
```

## API

### ngModules(options)

### Options:
#### name

Type: `string` `required`

The name of the module to create.

##### modules

Type: `array` `optional`

List of additional modules to include.

##### filter

Type: `array` `optional`

List of additional modules to exclude.

## Example

Check out the example directory: [gulpfile.js](example/gulpfile.js)

This is how the generated gulp-ng-modules.js will look like after

```javascript
(function () {
  'use strict';
  angular.module('myGlobalApp', ['another.module', 'ui.router']);
})();
```
