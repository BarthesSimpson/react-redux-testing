import { pluck } from '../reshape'

it('plucks an item from an object', () => {
  const initialState = {
    1: { id: 1 },
    2: { id: 2 }
  }
  expect(pluck(initialState, 'id', 1)).toEqual({
    2: { id: 2 }
  })
})
it('plucks without error when item is not found', () => {
  const initialState = {
    2: { id: 2 }
  }
  expect(pluck(initialState, 'id', 1)).toEqual({
    2: { id: 2 }
  })
})
