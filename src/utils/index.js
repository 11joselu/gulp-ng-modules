'use strict';

var gutil         = require('gulp-util');

var ARRRAY_REGEX  = /(\[).*([\s\t\n]?.*)+(\])/g;
var STRING_REGEX  = /(["'])([a-zA-Z0-9_.-]*)/g;
var PluginError   = gutil.PluginError;

var getUnique = function getUnique(item, index, self) {

  return self.indexOf(item) === index;
}

var isArray = function isArray(arr) {

  return Object.prototype.toString.call(arr) === '[object Array]';
}

var isInArray = function isInArray(arr, item) {

  return ~arr.indexOf(item) !== 0;
}

var removeFromArray = function removeFromArray(arr, item) {
  
  if (isInArray(arr, item)) {
      arr.splice(arr.indexOf(item), 1);  
  }

}

var joinContent = function joinContent(unique) {
  if (unique.length > 0) {
    
    return "[" + "'"+ unique.join("', '") +"']";
  }

  return "[]";
}

var content = function content(options, unique) {
  var result;
  var space = " ";

  result = "(function () {\n";
  result += "  "+ "'use strict';\n\n";
  result += "  " +"angular.module('"+ options.name +"', "+ joinContent(unique) +");\n";
  result += "})();";

  return result;

}


var getContent = function getContent(list, options) {

  if (options.modules) {
    list = list.concat(options.modules);
  }

  var unique = list.filter(getUnique);

  if (options.filter) {
    
    if (isArray(options.filter)) {
      options.filter.forEach( function(item) {
        removeFromArray(unique, item);
      });
    
    } else {
      throw new PluginError('Bad input', 'Filter must be an Array of strings')
    }

  }

  if (options.transform && typeof options.transform === 'function') {
    
    return options.transform(unique, options);
  }
  
  return content(options, unique);
}


module.exports = {
  getContent: getContent,
  ARRRAY_REGEX: ARRRAY_REGEX,
  STRING_REGEX: STRING_REGEX,
  PluginError: PluginError
}
