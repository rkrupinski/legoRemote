'use strict';

const Rx = require('rx');
const tessel = require('tessel');
const LegoIR = require('lego-ir');

const normalize = require('./normalize');
const infrared = require('./infrared');

const lego = new LegoIR({
  mode: 'comboDirect',
  channel: 1
});

function handleRemote(socket) {
  const input$ = Rx.Observable.fromEvent(socket, 'input');

  const subscription = input$
      .throttle(100)
      .map(normalize)
      .do(() => tessel.led[3].toggle())
      .subscribe(data => infrared.sendRawSignal(38, lego.move(data)));

  socket.on('disconnect', () => {
    console.log('Remote disconnected'.red);

    subscription && subscription.dispose();
  });
}

module.exports = handleRemote;
