import { Reducer } from 'redux-testkit'
import reducer, { _addResource, _removeResource } from '../state'

describe('Redux tests', () => {
  it('Adds a resource', () => {
    Reducer(reducer)
      .withState({
        1: { id: 1, name: 'Tom Brady' }
      })
      .expect(_addResource({ name: 'LeBron James' }))
      .toReturnState({
        1: { id: 1, name: 'Tom Brady' },
        2: { id: 2, name: 'LeBron James' }
      })
  })
  it('Increments id from current max', () => {
    Reducer(reducer)
      .withState({
        1: { id: 1, name: 'Tom Brady' },
        3: { id: 3, name: 'Wilt Chamberlain' }
      })
      .expect(_addResource({ name: 'LeBron James' }))
      .toReturnState({
        1: { id: 1, name: 'Tom Brady' },
        3: { id: 3, name: 'Wilt Chamberlain' },
        4: { id: 4, name: 'LeBron James' }
      })
  })
  it('Deletes a resource', () => {
    Reducer(reducer)
      .withState({
        1: { id: 1, name: 'Tom Brady' },
        2: { id: 2, name: 'LeBron James' }
      })
      .expect(_removeResource(2))
      .toReturnState({
        1: { id: 1, name: 'Tom Brady' }
      })
  })
})
