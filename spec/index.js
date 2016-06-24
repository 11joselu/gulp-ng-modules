'use strict';

var chai        = require('chai'),
  should        = chai.should(),
  expect        = chai.expect,
  assert        = chai.assert,
  path          = require('path'),
  gutil         = require('gulp-util'),
  fs            = require('fs'),
  ngModule      = require('../index'),
  File          = gutil.File,
  PluginError   = gutil.PluginError;


describe('gulp-ng-modules', function () {

  it('should be defined', function (done) {

    assert.isDefined(ngModule, 'ngModule is defined');
    done();
  });

  it('should emit PluginError on empty option name', function(done) {

    var content = "(function () {\n";
        content += "  " + "'use strict';\n\n";
        content += "  " + "angular.module('test', ['ui.router', 'ngResource']);\n";
        content += "})();";

    try {
      var stream = ngModule({});

      stream.write(new File({contents: new Buffer(content)}));

    } catch (err) {
      assert(err instanceof PluginError);
      assert.equal(err.message, 'Missing application name')
      done();
    }   
  });

  it('should set application name as \'test\'', function (done) {

    var stream = ngModule({
      name: 'test'
    });

    var content = "(function () {\n";
        content += "  " + "'use strict';\n\n";
        content += "  " + "angular.module('test', []);\n";
        content += "})();";

    stream.on("data", function(data) {
      assert.equal(data.contents.toString(), content);
      done();
    });

    stream.write(new File({contents: new Buffer(content)}));

  });

  it('should inject a new dependency', function(done) {

    var stream = ngModule({
      name: 'test',
      modules: ['ui.router']
    });

    var content = "(function () {\n";
        content += "  " + "'use strict';\n\n";
        content += "  " + "angular.module('test', ['ui.router']);\n";
        content += "})();";

    stream.on("data", function(data) {
      assert.equal(data.contents.toString(), content);
      done();
    });

    stream.write(new File({contents: new Buffer(content)}));

  });

  it('should inject a multiples dependencies', function(done) {

    var stream = ngModule({
      name: 'test',
      modules: ['ui.router', 'ngResource']
    });

    var content = "(function () {\n";
        content += "  " + "'use strict';\n\n";
        content += "  " + "angular.module('test', ['ui.router', 'ngResource']);\n";
        content += "})();";

    stream.on("data", function(data) {
      assert.equal(data.contents.toString(), content);
      done();
    });

    stream.write(new File({contents: new Buffer(content)}));

  });


  it('should emit PluginError on bad input at filter option', function(done) {

    var stream = ngModule({
      name: 'test',
      modules: ['ui.router', 'ngResource', 'will.remove'],
      filter: 'will.remove'
    });

    var content = "(function () {\n";
        content += "  " + "'use strict';\n\n";
        content += "  " + "angular.module('test', ['ui.router', 'ngResource']);\n";
        content += "})();";

    try {
      stream.write(new File({contents: new Buffer(content)}));

    } catch (err) {
      assert(err instanceof gutil.PluginError);
      assert.equal(err.message, "Filter must be an Array of strings")
      done();
    }   

  });

  it('should remove a dependency', function(done) {

    var stream = ngModule({
      name: 'test',
      modules: ['ui.router', 'ngResource', 'will.remove'],
      filter: ['will.remove']
    });

    var content = "(function () {\n";
        content += "  " + "'use strict';\n\n";
        content += "  " + "angular.module('test', ['ui.router', 'ngResource']);\n";
        content += "})();";

    stream.on("data", function(data) {
      assert.equal(data.contents.toString(), content);
      done();
    });

    stream.write(new File({contents: new Buffer(content)}));

  });


});