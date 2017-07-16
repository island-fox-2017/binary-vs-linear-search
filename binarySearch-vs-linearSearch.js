'use strict'

//var Array = require('./array_sample');
const fs = require('fs');
var Benchmark = require('benchmark');

function linearSearch(target, values) {
  for (let i = 0; i < values.length; i++) {
    if (values[i] === target)
      return i;
  }
  return -1;
}

function binary_search(search, arr, start = 0, end = arr.length - 1) {
  if (start > end)
    return -1;

  let mid  = Math.floor( (start + end) / 2 );

  if (search > arr[mid])
    return binary_search(search, arr, (mid + 1), end);
  else if (search < arr[mid])
    return binary_search(search, arr, start, (mid - 1));
  else
    return mid;
}

// Array contains 10.000 elements (integer, sorted)
//var arr = new Array();
// Array contains 1.000.000 elements (integer, sorted)
let arr = fs.readFileSync('oneMillionDataSample.txt', 'utf-8');
arr = arr.replace(/\n$/, "").split(',');
let performanceTest = 789673;


//----------------------------------------------------------------
// BENCHMARK
// To use this benchmark don't forget to install lodash as dependencies.
// and just go and read the documentation here https://benchmarkjs.com/

var suite = new Benchmark.Suite;

suite.add('linearSearch#test', function() {
  linearSearch(performanceTest, arr);
})
.add('binarySearch#test', function() {
  binary_search(performanceTest, arr);
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
