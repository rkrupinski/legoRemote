'use strict';

const tessel = require('tessel');
const infraredlib = require('ir-attx4');

module.exports = infraredlib.use(tessel.port.B);
