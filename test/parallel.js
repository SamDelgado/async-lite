var async = require('../async-lite.js');
var expect = require('expect.js');

describe('async.parallel', function() {

  it('should not process an empty object or array', function(done) {

    async.parallel([], function(err, results) {

      expect(err).to.not.be.ok();
      expect(results).to.not.be.ok();
      done();

    });

  });

  it('should process an array of functions', function(done) {

    async.parallel([

      function task1(callback) {
        callback();
      },

      function task2(callback) {
        callback();
      },

      function task3(callback) {
        callback();
      }

    ], function(err, results) {

      expect(err).to.not.be.ok();
      expect(results).to.be.an('array');
      done();

    });

  });

  it('should process an object that has multiple properties that are each a task method', function(done) {

    async.parallel({

      task1: function(callback) {
        callback();
      },

      task2: function(callback) {
        callback();
      },

      task3: function(callback) {
        callback();
      },

    }, function(err, results) {

      expect(err).to.not.be.ok();
      expect(results).to.be.an('object');
      done();

    });

  });

  it('should process all tasks at once', function(done) {

    var start_time = Date.now();

    async.parallel([

      function task1(callback) {
        setTimeout(function() {
          callback();
        }, 200);
      },

      function task2(callback) {
        setTimeout(function() {
          callback();
        }, 400);
      },

      function task3(callback) {
        setTimeout(function() {
          callback();
        }, 600);
      }

    ], function(err, results) {

      var end_time = Date.now();
      var time_difference = end_time - start_time;

      expect(err).to.not.be.ok();
      expect(results).to.be.an('array');
      expect(results[0]).to.not.be.ok();
      expect(results[1]).to.not.be.ok();
      expect(results[2]).to.not.be.ok();
      expect(time_difference).to.be.lessThan(1200);
      done();

    });

  });

  it('should return the results array with the items in the same order as the tasks were listed in the tasks array', function(done) {

    var start_time = Date.now();

    async.parallel([

      function task1(callback) {
        setTimeout(function() {
          callback(null, "task1");
        }, 600);
      },

      function task2(callback) {
        setTimeout(function() {
          callback(null, "task2");
        }, 400);
      },

      function task3(callback) {
        setTimeout(function() {
          callback(null, "task3");
        }, 200);
      }

    ], function(err, results) {

      var end_time = Date.now();
      var time_difference = end_time - start_time;

      expect(err).to.not.be.ok();
      expect(results).to.be.an('array');
      expect(results).to.eql(["task1", "task2", "task3"]);
      expect(time_difference).to.be.lessThan(1200);
      done();

    });

  });

  it('should return the results object with keys corresponding to the task names', function(done) {

    var start_time = Date.now();

    async.parallel({

      one: function(callback) {
        setTimeout(function() {
          callback(null, "task1");
        }, 600);
      },

      two: function(callback) {
        setTimeout(function() {
          callback(null, "task2");
        }, 400);
      },

      three: function(callback) {
        setTimeout(function() {
          callback(null, "task3");
        }, 200);
      }

    }, function(err, results) {

      var end_time = Date.now();
      var time_difference = end_time - start_time;

      expect(err).to.not.be.ok();
      expect(results).to.be.an('object');
      expect(results).to.eql({one: "task1", two: "task2", three: "task3"});
      expect(time_difference).to.be.lessThan(1200);
      done();

    });

  });

  it('should stop processing the array of tasks when a task passes a truthy error value to the callback', function(done) {

    var start_time = Date.now();

    async.parallel([

      function task1(callback) {
        setTimeout(function() {
          callback(null, "task1");
        }, 600);
      },

      function task2(callback) {
        setTimeout(function() {
          callback(true, "task2");
        }, 400);
      },

      function task3(callback) {
        setTimeout(function() {
          callback(null, "task3");
        }, 200);
      }

    ], function(err, results) {

      var end_time = Date.now();
      var time_difference = end_time - start_time;

      expect(err).to.be.ok();
      expect(results).to.not.be.ok();
      expect(time_difference).to.be.lessThan(600);
      done();

    });
  });

});
