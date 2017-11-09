import proximitySearchArray from '../index.js'

describe('Proximity Search Array', () => {
  
  let collection
  let index
  let options
  beforeEach(() => {
    collection = [
      'a',
      'b',
      562,
      false,
      null,
      3.14,
      undefined,
      { 'hello': ['world']},
    ]
    index = 1
    options = {}
  })

  describe('Input', () => {
    it('should throw with invalid arguments', () => {
      expect(() => { proximitySearchArray() }).toThrow()
    })

    it('should accept zero values for index and/or spread', () => {
      expect(() => { proximitySearchArray(collection, 0, 0) }).not.toThrow()
    })
  })

  describe('Return values', () => {
    it('should fail when passing invalid index', () => {
      expect(() => { proximitySearchArray(collection, 22, 2) }).toThrow()
      expect(() => { proximitySearchArray([], 0, 3) }).toThrow()
    })

    it('should NOT fail when passing invalid index w/ safe option set to ' +
       'false', () => {
      expect(() => { 
        proximitySearchArray(collection, 22, 2, { safe: false }) 
      }).not.toThrow()
      expect(() => { 
        proximitySearchArray([], 0, 3, { safe: false })
      }).not.toThrow()
    })

    it('should prioritize slicing the right side by default when passing ' +
       'odd amount', () => {
      expect(proximitySearchArray(collection, 4, 3))
        .toEqual([ false, null, 3.14, undefined ])
    })

    it('should prioritize slicing the left side with option by passing' +
       'odd amount', () => {
      expect(proximitySearchArray(collection, 4, 3, { prioritizeLeft: true }))
        .toEqual([ 562, false, null, 3.14 ])
      expect(proximitySearchArray(collection, 4, 5, { prioritizeLeft: true }))
        .toEqual([ 'b', 562, false, null, 3.14, undefined ])
    })

    it('should handle edge of the collection correctly even with prioritize ' +
       'left option', () => {
      expect(proximitySearchArray(collection, 0, 3, { prioritizeLeft: true }))
        .toEqual([ 'a', 'b', 562, false ])
    })

    it('should return the whole collection when amount is bigger than ' +
       'the size of the collection', () => {
      expect(proximitySearchArray(collection, index, 7))
        .toEqual(collection)
      expect(proximitySearchArray(collection, index, 8))
        .toEqual(collection)
      expect(proximitySearchArray(collection, index, 17))
        .toEqual(collection)
    })

    describe('Even numbers', () => {
      it('should return correct items', () => {
        expect(proximitySearchArray(collection, 4, 2).length).toEqual(3)
        expect(proximitySearchArray(collection, 4, 2))
          .toEqual([ false, null, 3.14 ])

        expect(proximitySearchArray(collection, 4, 4).length).toEqual(5)
        expect(proximitySearchArray(collection, 4, 4))
          .toEqual([ 562, false, null, 3.14, undefined])

        expect(proximitySearchArray(collection, 4, 5).length).toEqual(6)
        expect(proximitySearchArray(collection, 4, 5))
          .toEqual([ 562, false, null, 3.14, undefined, { 'hello': ['world']} ])
      })

      it('should return correct items from beginning of the collection', () => {
        expect(proximitySearchArray(collection, 1, 4).length).toEqual(5)
        expect(proximitySearchArray(collection, 1, 4))
          .toEqual([ 'a', 'b', 562, false, null ])

        expect(proximitySearchArray(collection, 0, 3).length).toEqual(4)
        expect(proximitySearchArray(collection, 0, 3))
          .toEqual([ 'a', 'b', 562, false ])
      })

      it('should return correct items from end of the collection', () => {
        expect(proximitySearchArray(collection, 7, 2).length).toEqual(3)
        expect(proximitySearchArray(collection, 7, 2))
          .toEqual([ 3.14, undefined, { 'hello': ['world']}])

        expect(proximitySearchArray(collection, 6, 3).length).toEqual(4)
        expect(proximitySearchArray(collection, 6, 3))
          .toEqual([ null, 3.14, undefined, { 'hello': ['world']}])
      })
    })

   describe('Odd numbers', () => {
     beforeEach(() => {
       collection = [
         99,
         'x',
         671,
         [2, 1],
         null,
         'word',
         8123.21
       ]
     })

     it('should return correct items', () => {
       expect(proximitySearchArray(collection, 2, 2).length).toEqual(3)
       expect(proximitySearchArray(collection, 2, 2))
         .toEqual([ 'x', 671, [2, 1] ])

       expect(proximitySearchArray(collection, 3, 4).length).toEqual(5)
       expect(proximitySearchArray(collection, 3, 4))
         .toEqual([ 'x', 671, [2, 1], null, 'word' ])

       expect(proximitySearchArray(collection, 3, 3).length).toEqual(4)
       expect(proximitySearchArray(collection, 3, 3))
         .toEqual([ 671, [2, 1], null, 'word' ])
     })

     it('should return correct items from beginning of the collection', () => {
       expect(proximitySearchArray(collection, 0, 4).length).toEqual(5)
       expect(proximitySearchArray(collection, 0, 4))
         .toEqual([ 99, 'x', 671, [2, 1], null])

       expect(proximitySearchArray(collection, 0, 3).length).toEqual(4)
       expect(proximitySearchArray(collection, 0, 3))
         .toEqual([ 99, 'x', 671, [2, 1]])
     })

     it('should return correct items from end of the collection', () => {
       expect(proximitySearchArray(collection, 6, 2).length).toEqual(3)
       expect(proximitySearchArray(collection, 6, 2))
         .toEqual([ null, 'word', 8123.21 ])

       expect(proximitySearchArray(collection, 5, 3).length).toEqual(4)
       expect(proximitySearchArray(collection, 5, 3))
         .toEqual([ [2, 1], null, 'word', 8123.21 ])
     })
   })
  })

  describe('Amount is 1', () => {
    it('should return items', () => {
      expect(proximitySearchArray(collection, index, 1).length).toEqual(2)
      expect(proximitySearchArray(collection, index, 1)).toEqual([ 'b', 562 ])
    })

    it('should return items to the left when prioritizeLeft is set', () => {
      expect(
          proximitySearchArray(collection, index, 1, { prioritizeLeft: true })
          .length).toEqual(2)
      expect(
          proximitySearchArray(collection, index, 1, { prioritizeLeft: true }))
        .toEqual(['a', 'b'])
    })

    it('should handle edge of the collection correctly', () => {
      expect(proximitySearchArray(collection, 0, 1)).toEqual([ 'a', 'b' ])
      expect(proximitySearchArray(collection, 0, 1, { prioritizeLeft: true }))
        .toEqual([ 'a', 'b' ])
    })
  })
})
