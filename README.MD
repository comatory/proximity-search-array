# proximity-search-array

This is simple package with function `proximitySearchArray` that allows you to return items from array that are neighbours on given index. 

`proximitySearchArray(collection: Array<any>, index: number, amount: number, options?: { safe?: boolean, prioritizeLeft?: boolean }): Array<any>`

## Installation

```
npm install proximity-search-array
```

## Example

Just import the function where you want to use it:

```
import proximitySearchArray from 'proximity-search-array'
```

Perform proximity search:

```
  const array = ['a', 'b', 'c', 'd', 1, 2, 3, 4]
  proximitySearchArray(array, 3, 4)
  // [ 'b', 'c', 'd', 1, 2 ]
```

This means that you want to get 4 surrounding items on index 3 of given array. The function tries to distribute the surrounding items evenly.

If the amount is odd number, returned items will be prioritized on the right side by default:

```
proximitySearchArray(array, 3, 3)
// [ 'c', 'd', 1, 2 ]
```

You can prioritize the left side by passing a flag in options argument:

```
proximitySearchArray(array, 3, 3, { prioritizeLeft: true })
// [ 'b', 'c', 'd', 1 ]
```

The function will always return requested amount of items plus the item on the index if possible. You do not have to worry if you are on the edge of the array, the items that would otherwise precede the item at the index will instead be shifted:

```
proximitySearchArray(array, 1, 4)
// [ 'a', 'b', 'c', 'd', 1 ]
```

## Development

You can build the source files by running `npm run build` or `npm run build:watch` (live reload).

Tests are run by `npm run test`.

Feel free to fork the project or suggest any changes by opening an issue [here](https://github.com/comatory/proximity-search-array) on Github.