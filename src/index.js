// @flow

// comment
export default function proximitySearchArray(
    collection: Array,
    index: number, 
    amount: number,
    options = {
      safe: true,
      prioritizeLeft: false,
    }) {

  options.safe === undefined ? options.safe = true : options.safe

  if (!options.safe) {
    console.warn('You are using unsafe mode! You are risking getting wrong ' +
                 'results because input checking is turned off')
  }

  if (!collection || (index !== 0 && !index) ||
     (amount !== 0 && !amount) && options.safe) {
    throw new Error('You must pass valid arguments! Array, index, amount')
  }

  if (options.safe && index > collection.length - 1) {
    throw new Error('Invalid index! Out of bounds.')
  }

  if (options.safe && (Math.abs(index) !== index) ||
      Math.abs(amount) !== amount
     ) {
    throw new Error('This function only works with positive values for ' +
                    'index and amount')
  }

  return getResult(collection, index, amount, options)
}

const getResult = (collection, index, amount, options) => {
  const { prioritizeLeft } = options
  let side = prioritizeLeft ? Math.ceil(amount / 2) : Math.floor(amount / 2)

  let startIndex = Math.max(0, index - side)

  if (startIndex + amount + 1 > collection.length) {
    startIndex = Math.max(0, collection.length - 1 - amount)
  }

  const endIndex = Math.max(0, startIndex + amount)

  return collection.slice(startIndex, endIndex + 1) // NOTE: Include last item 
}

