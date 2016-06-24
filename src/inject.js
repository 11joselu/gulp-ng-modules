'use strict';

var fs            = require('fs');
var through       = require('through2');
var stripComments = require('strip-comments');
var path          = require('path');
var utils         = require('./utils');

module.exports = function (options) {

  if (!options || !options.name) throw new utils.PluginError('Modules error', 'Missing application name');

  return through.obj(function(file, enc, done) {

    var list = [];

    if (file.isNull()) {
      this.push(file);
      
      return done();
    }

    if (file.isStream()) {
      this.push(file);

      return done();
    }


    var contents = file.contents.toString();

    contents = stripComments(contents);

    var arrayRegex  = new RegExp(utils.ARRRAY_REGEX);
    var str         = new RegExp(utils.STRING_REGEX);

    var modules     = contents.match(arrayRegex);

    if (modules) {

      var arrayModules = modules[0].match(str);

      if (arrayModules) {
        arrayModules = arrayModules
          .map(function (match) {
            match = match.trim();
            match = match.replace('\'', '');

            return match;
          })
          .filter(function (match) {
            return match !== "";
          });
      } else {
        arrayModules = [];
      }

      list = arrayModules;

      var content   = utils.getContent(list, options);
      file.contents = new Buffer(content);
      this.push(file);

      return done();

    } else {
      this.push(file);

      return done();
    }

  });
}