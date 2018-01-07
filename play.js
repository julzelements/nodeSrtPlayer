const { parse, stringify, resync, toMS, toSrtTime } = require('subtitle');
const fs = require('fs');

const movieStartTime = getMovieStartTime();
const subtitleFile = getSubtitleFile();
const logging = getLoggingPreference();
const offset = Date.now() - movieStartTime;

const myString = fs.readFileSync(subtitleFile, 'utf8');
const mySubs = parse(myString);

mySubs.forEach((stanza) => {
    if (stanza.start >= movieStartTime) {
        setTimeout(() => {
            console.log(stanza.text);
            if (logging) {
                logSubtitleEventMetadata(Date.now(), offset, stanza)
            };
        }, stanza.start - movieStartTime);
        setTimeout(() => {
            console.log('');
        }, stanza.end - movieStartTime);
    }   
});

function getMovieStartTime() {
    const movieStartTime = process.argv[3];
    if (movieStartTime) {
        console.log('playing subtitles from: ' + movieStartTime + ' milliseconds');
        return movieStartTime;
    } 
    console.log('no start time provided by user\nstarting at 0 milliseconds');
    return 0;
}

function getSubtitleFile() {
    const subtitleFile = process.argv[2];
    if (subtitleFile) {
        console.log('found subtitle file: ' + subtitleFile + '');
        return subtitleFile;
    } 
    console.log('no subtitle file provided by user\ndefaulting to test file');
    return 'test.srt';
}

function getLoggingPreference() {
    if (process.argv[4] === 'verbose') {
        console.log('medata loggin enabled')
        return true;
    } 
    return false;
}

function logSubtitleEventMetadata(time, offset, stanza) {
    const expected = offset + stanza.start;
    const actual = Date.now();
    const error = actual - expected;
    console.log('===============METADATA=============');
    console.log('expected event fire time: ' + expected);
    console.log('actual fire time: ' + actual);
    console.log('error: ' + error);
    console.log('===============METADATA=============\n\n');
}