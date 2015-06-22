# Async-Lite.js

[![Build Status via Travis CI](https://travis-ci.org/SamDelgado/async-lite.svg?branch=master)](https://travis-ci.org/caolan/async)
[![NPM version](http://img.shields.io/npm/v/async-lite.svg)](https://www.npmjs.org/package/async-lite)

Async-Lite is a tiny async library (1kb minified) for modern environments with no dependencies, and only containing each, eachSeries, series, and parallel methods. These methods are the ones I most often use when I need asynchronous looping or control flow, so bringing in the entire caolan/async library was overkill. You can use with [Node.js](http://nodejs.org) or in the browser. Install it via `npm install async-lite` or just grab the async-lite.min.js file from this repository.

## Documentation

### each(arr, iterator, [callback])

Loop through an array without caring what order your array items are accessed. If any item passes an error to its callback, no other items are processed, and the main callback is immediately called with the value of the error.

```javascript

var async = require('async-lite');

var myArray = [{name: "Sam", timeToWait: 200}, {name: "Bill", timeToWait: 400}, {name: "Steve", timeToWait: 600}];

function someAsyncFunction(item, callback) {

  setTimeout(function() {

    if (item.name === "Sam") {
      alert("That is a great name");
    } else {
      alert("You should change your name");
    }

    callback(null); // leave the callback empty or callback null if there are no errors

  }, item.timeToWait);

}

async.each(myArray, function(item, callback) {

  someAsyncFunction(item, function(err) {

    // callback when done
    // passing in a truthy error will stop the whole loop
    callback(err);

  });

});

```

The total time that passed could be as little as 600 milliseconds since all items are accessed at once. The total amount of time should be slightly longer than the slowest operation.

### eachSeries(arr, iterator, [callback])

Loop through an array in order. An item will be only be accessed once the previous item is done being accessed. If any item passes an error to its callback, no other items are processed, and the main callback is immediately called with the value of the error.

```javascript

var async = require('async-lite');

var myArray = [{name: "Sam", timeToWait: 200}, {name: "Bill", timeToWait: 400}, {name: "Steve", timeToWait: 600}];

function someAsyncFunction(item, callback) {

  setTimeout(function() {

    if (item.name === "Sam") {
      alert("That is a great name");
    } else {
      alert("You should change your name");
    }

    callback(null); // leave the callback empty or callback null if there are no errors

  }, item.timeToWait);

}

async.eachSeries(myArray, function(item, callback) {

  someAsyncFunction(item, function(err) {

    // callback when done
    // passing in a truthy error will stop the whole loop
    callback(err);

  });

});

```

The total time that passed will be at least 1200 milliseconds since Bill had to wait 200 milliseconds for Sam to be done before starting, and then Steve had to wait 400 milliseconds for Bill to be done before starting.

## series(tasks, [callback])

Run each of the tasks in the array, each one running once the previous task has completed. The callback will receive an array of results in the correct order once all tasks are completed. If any task passes an error to its callback, no other tasks are run, and the main callback is immediately called with the value of the error.

```javascript

var async = require('async-lite');

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

  // results = ["task1", "task2", "task3"];

});

```

The total time that passed will be at least 1200 milliseconds since task2 had to wait 600 milliseconds for task1 to be done before starting, and then task3 had to wait 400 milliseconds for task2 to be done before starting.

## parallel(tasks, [callback])

Run all of the tasks simultaneously. Unlike the series method, parallel can accept an array or object. The callback will receive an array or object of results in the correct order once all tasks are completed. If any task passes an error to its callback, no other tasks are run, and the main callback is immediately called with the value of the error.

```javascript

var async = require('async-lite');

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

  // results = ["task1", "task2", "task3"];

});

/*********** OR *************/

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

  // results = {one: "task1", two: "task2", three: "task3"};

});

```

The total time that passed could be as little as 600 milliseconds since all tasks are processed at once. The total amount of time should be slightly longer than the slowest task.
