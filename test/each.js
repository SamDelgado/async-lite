var async = require('../async-lite.js');
var expect = require('expect.js');

var myArray = [{name: "Sam", timeToWait: 200}, {name: "Bill", timeToWait: 400}, {name: "Steve", timeToWait: 600}];

describe('async.each', function() {

  it('should only process arrays with at least 1 item', function(done) {

    var results = [];
    var emptyArray = []; // anything but a populated array will immediately execute the callback function

    async.each(emptyArray, function(item, cb) {

      results.push(item);
      cb();

    }, function(err) {

      expect(err).to.not.be.ok();
      expect(results).to.be.empty();
      done();

    });

  });

  it('should start processing all items in the array simultaneously', function(done) {

    var start_time = Date.now();

    async.each(myArray, function(item, cb) {

      setTimeout(function() {
        cb();
      }, item.timeToWait);

    }, function(err) {

      var end_time = Date.now();
      var time_difference = end_time - start_time;

      expect(err).to.not.be.ok();
      expect(time_difference).to.be.lessThan(1200);
      done();

    });

  });

  it('should stop processing the array when an item passes a truthy value to the callback', function(done) {

    var start_time = Date.now();

    async.each(myArray, function(item, cb) {

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
