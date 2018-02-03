const { identity, flow } = require('lodash')
const io = require('socket.io-client')
const socket = io.connect('wss://streamer.cryptocompare.com')

const fields = {
  'TYPE': 0x0,
  'MARKET': 0x0,
  'FROMSYMBOL': 0x0,
  'TOSYMBOL': 0x0,
  'FLAGS': 0x0,
  'PRICE': 0x1,
  'BID': 0x2,
  'OFFER': 0x4,
  'LASTUPDATE': 0x8,
  'AVG': 0x10,
  'LASTVOLUME': 0x20,
  'LASTVOLUMETO': 0x40,
  'LASTTRADEID': 0x80,
  'VOLUMEHOUR': 0x100,
  'VOLUMEHOURTO': 0x200,
  'VOLUME24HOUR': 0x400,
  'VOLUME24HOURTO': 0x800,
  'OPENHOUR': 0x1000,
  'HIGHHOUR': 0x2000,
  'LOWHOUR': 0x4000,
  'OPEN24HOUR': 0x8000,
  'HIGH24HOUR': 0x10000,
  'LOW24HOUR': 0x20000,
  'LASTMARKET': 0x40000
}

function unpack (value) {
  var valuesArray = value.split('~')
  var valuesArrayLength = valuesArray.length;
  var mask = valuesArray[valuesArrayLength - 1];
  var maskInt = parseInt(mask, 16);
  var unpackedCurrent = {};
  var currentField = 0;
  for (var property in fields) {
    if (fields[property] === 0) {
      unpackedCurrent[property] = valuesArray[currentField];
      currentField++;
    } else if (maskInt & fields[property]) {
      //i know this is a hack, for cccagg, future code please don't hate me:(, i did this to avoid
      //subscribing to trades as well in order to show the last market
      if (property === "LASTMARKET") {
        unpackedCurrent[property] = valuesArray[currentField];
      } else {
        unpackedCurrent[property] = parseFloat(valuesArray[currentField]);
      }
      currentField++;
    }
  }

  return unpackedCurrent;
}

function subscriptionId (symbol) {
  return `5~CCCAGG~${symbol}~USD`
}

function subscribe (symbols, cb=identity) {
  const subs = symbols.map(subscriptionId)
  socket.emit('SubAdd', { subs })
  socket.on('m', flow(unpack, cb))

  return function () {
    socket.emit('SubRemove', { subs })
  }
}

module.exports = {
  subscribe
}
