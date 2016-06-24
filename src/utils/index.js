'use strict';

var ARRRAY_REGEX  = /(\[).*([\s\t\n]?.*)+(\])/g;
var STRING_REGEX  = /(["'])([a-zA-Z0-9_.-]*)/g;

var getUnique = function getUnique(item, index, self) {

  return self.indexOf(item) === index;
}

var isArray = function isArray(arr) {

  return Object.prototype.toString.call(arr) === '[Object Array]';
}

var isInArray = function isInArray(arr, item) {

  return ~arr.indexOf(item) === -1;
}

var removeFromArray = function removeFromArray(arr, item) {
  
  if (isInArray(arr, item)) {
      arr.splice(arr.indexOf(item), 1);  
  }

}

var content = function content(options, unique) {
  var result;
  var space = " ";

  result = "(function () {\n";
  result += space.repeat(2) + "'use strict';\n\n";
  result += space.repeat(2) +"angular.module('"+ options.name +"', [\n"+
  space.repeat(4)+ "'"+ unique.join("',\n"+ space.repeat(4)+"'") +"'\n"+
  space.repeat(2)+"]);\n";
  result += "})();";

  return result;
}


var getContent = function getContent(list, options) {

  if (options.modules) {
    list = list.concat(options.modules);
  }

  var unique = list.filter(getUnique);


  if (options.filter && isArray(options.filter)) {
      options.filter.forEach( function(item) {
        removeFromArray(unique, item);
      });
  }

  
  return content(options, unique);
}


module.exports = {
  getContent: getContent,
  ARRRAY_REGEX: ARRRAY_REGEX,
  STRING_REGEX: STRING_REGEX,
}