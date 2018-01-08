# Simple node subtitle player

## Dependencies
subtitle

## Description
This subtitle player will:
* load an subtitle file in .srt format
* instantly begin to play it at a point in the file specified by the user

## Instructions
```bash
$cd nodeSrtPlayer
$ npm install
```

To start playing the spiderman.srt file at the 19 second mark:
```bash
$ node player spiderman.srt 19000
```

To play the test file at zero seconds with medatata logging: 
```bash
$ node player test.srt 0 verbose
```

To play default file:
```bash
$ node player
```





