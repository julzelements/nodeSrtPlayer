const { parse, stringify, resync, toMS, toSrtTime } = require('subtitle');
const fs = require('fs');


const myString = fs.readFileSync('test.srt', 'utf8');
const mySubs = parse(myString);
console.log(mySubs);

console.log(myString);