'use strict'

const fs = require('fs');

let arr = fs.readFileSync('tenDataSample.txt', 'utf-8');
arr = arr.replace(/\n$/, "").split(',');

console.log(arr);
