# Async-Lite.js

Async-Lite is a tiny async library for modern environments with no dependencies, and only containing each, eachSeries, series, and parallel methods. These methods are the ones I most often use when I need asynchronous looping or control flow, so bringing in the entire caolan/async library was overkill. You can use with [Node.js](http://nodejs.org) or in the browser. Install it via `npm install async-lite` or just grab the async-lite.js file from this repository.

## Documentation

### each

Loop through an array without caring what order your array items are accessed.

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

The total time that passed could be as little as 600 milliseconds since all items are accessed at once. The total amount of time should be roughly equal to the slowest operation.

### eachSeries

Loop through an array in order. An item will be only be accessed once the previous item is done being accessed.

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

## series

## parallel
