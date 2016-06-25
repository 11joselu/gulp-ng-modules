# Gulp Angular Module injection
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

The name of the module to create or retrieve.

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
