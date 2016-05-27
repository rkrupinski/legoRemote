'use strict';

const Rx = require('rx');
const io = require('socket.io')(3000);
const colors = require('colors');
const tessel = require('tessel');

const handleRemote = require('./handleRemote');
const infrared = require('./infrared');

const ir$ = Rx.Observable.fromEventPattern(
    h => infrared.on('ready', h));
const io$ = Rx.Observable.fromEventPattern(
    h => io.on('connection', h));

tessel.led[2].off();
tessel.led[3].off();

ir$
    .take(1)
    .do(() => {
      console.log('IR ready'.green);
      tessel.led[2].on();
    })
    .flatMap(() => io$)
    .do(() => {
      console.log('Remote connected'.green);
      tessel.led[2].off();
    })
    .delay(500)
    .do(() => tessel.led[2].on())
    .subscribe(handleRemote);
