'use strict';

const contants = require('./constants');

const keyMap = {
  steer: 'outputA',
  drive: 'outputB',
};

function normalize(data) {
  return Object.keys(data).reduce((acc, curr) => {
    acc[keyMap[curr]] = contants[data[curr]];

    return acc;
  }, {});
}

module.exports = normalize;
