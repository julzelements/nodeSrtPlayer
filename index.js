const { parse, stringify, resync, toMS, toSrtTime } = require('subtitle');
const fs = require('fs');

const movieTime = 17084; //milliseconds into the movie
const offset = Date.now() - movieTime;

const myString = fs.readFileSync('test.srt', 'utf8');
const mySubs = parse(myString);
console.log(mySubs);

console.log(offset);

mySubs.forEach((subtitle) => {
    if (subtitle.start >= movieTime) {
        setTimeout(() => {
            console.log(subtitle.text);
            console.log(Date.now() - offset);
            
        }, subtitle.start - movieTime);
        setTimeout(() => {
            console.log('');
        }, subtitle.end - movieTime);
    }   
});
