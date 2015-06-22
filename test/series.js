var async = require('../async-lite.js');
var expect = require('expect.js');

describe('async.series', function() {

  it('should only process task arrays with at least 1 task', function(done) {

    async.series([], function(err, results) {

      expect(err).to.not.be.ok();
      expect(results).to.not.be.ok();
      done();

    });

  });

  it('should only process 1 task in the array at a time', function(done) {

    var start_time = Date.now();

    async.series([

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
      expect(time_difference).to.be.greaterThan(1200);
      done();

    });

  });

  it('should process each task in order', function(done) {

    var start_time = Date.now();

    async.series([

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
      expect(time_difference).to.be.greaterThan(1200);
      done();

    });

  });

  it('should stop processing the array of tasks when a task passes a truthy error value to the callback', function(done) {

    var start_time = Date.now();

    async.series([

      function task1(callback) {
        setTimeout(function() {
          callback(true, "task1");
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

      expect(err).to.be.ok();
      expect(results).to.not.be.ok();
      expect(time_difference).to.be.lessThan(1000);
      done();

    });
  });

});
