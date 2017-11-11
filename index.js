'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = proximitySearchArray;


// comment
function proximitySearchArray(collection, index, amount) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    safe: true,
    prioritizeLeft: false
  };


  if (!options.safe) {
    console.warn('You are using unsafe mode! You are risking getting wrong ' + 'results because input checking is turned off');
  }

  if (!collection || index !== 0 && !index || amount !== 0 && !amount && options.safe) {
    throw new Error('You must pass valid arguments! Array, index, amount');
  }

  if (options.safe && index > collection.length - 1) {
    throw new Error('Invalid index! Out of bounds.');
  }

  if (options.safe && Math.abs(index) !== index || Math.abs(amount) !== amount) {
    throw new Error('This function only works with positive values for ' + 'index and amount');
  }

  return getResult(collection, index, amount, options);
}

var getResult = function getResult(collection, index, amount, options) {
  var prioritizeLeft = options.prioritizeLeft;

  var side = prioritizeLeft ? Math.ceil(amount / 2) : Math.floor(amount / 2);

  var startIndex = Math.max(0, index - side);

  if (startIndex + amount + 1 > collection.length) {
    startIndex = Math.max(0, collection.length - 1 - amount);
  }

  var endIndex = Math.max(0, startIndex + amount);

  return collection.slice(startIndex, endIndex + 1); // NOTE: Include last item 
};
module.exports = exports['default'];
