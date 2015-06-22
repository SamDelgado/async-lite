var async = require('../async-lite.js');
var expect = require('expect.js');

var myArray = [{name: "Sam", timeToWait: 200}, {name: "Bill", timeToWait: 400}, {name: "Steve", timeToWait: 600}];

describe('async.eachSeries', function() {

  it('should only process arrays with at least 1 item', function(done) {

    var results = [];
    var emptyArray = []; // anything but a populated array will immediately execute the callback function

    async.eachSeries(emptyArray, function(item, cb) {

      results.push(item);
      cb();

    }, function(err) {

      expect(err).to.not.be.ok();
      expect(results).to.be.empty();
      done();

    });

  });

  it('should only process 1 item in the array at a time', function(done) {

    var start_time = Date.now();

    async.eachSeries(myArray, function(item, cb) {

      setTimeout(function() {
        cb();
      }, item.timeToWait);

    }, function(err) {

      var end_time = Date.now();
      var time_difference = end_time - start_time;

      expect(err).to.not.be.ok();
      expect(time_difference).to.be.greaterThan(1200);
      done();

    });

  });

  it('should process each item in the array in order', function(done) {

    var results = [];

    async.eachSeries(myArray, function(item, cb) {

      results.push(item.name);
      cb();

    }, function(err) {

      expect(err).to.not.be.ok();
      expect(results).to.eql(["Sam", "Bill", "Steve"]);
      done();

    });

  });

  it('should stop processing the array when an item passes a truthy value to the callback', function(done) {

    var start_time = Date.now();

    async.eachSeries(myArray, function(item, cb) {

      setTimeout(function() {
        if (item.name === "Sam") {
          cb(true);
        } else {
          cb();
        }
      }, item.timeToWait);

    }, function(err) {

      var end_time = Date.now();
      var time_difference = end_time - start_time;

      expect(err).to.be.ok();
      expect(time_difference).to.be.lessThan(400);
      done();

    });

  });

});
