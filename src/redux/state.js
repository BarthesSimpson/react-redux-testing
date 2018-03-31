import { pluck, toArray } from '../helpers/reshape'

export const ADD_RESOURCE = 'state/actions/ADD_RESOURCE'
export const REMOVE_RESOURCE = 'state/actions/REMOVE_RESOURCE'

export function _addResource(resource) {
  return {
    type: ADD_RESOURCE,
    resource
  }
}
export function _removeResource(id) {
  return {
    type: REMOVE_RESOURCE,
    id
  }
}
export default function reducer(state = {}, action) {
  const { id, resource, type } = action
  switch (type) {
    case ADD_RESOURCE:
      const maxId = toArray(state).reduce(
        (maxId, { id }) => Math.max(maxId, id),
        0
      )
      const newId = maxId + 1
      return { ...state, [newId]: { ...resource, id: newId } }
    case REMOVE_RESOURCE:
      return pluck(state, 'id', id)
    default:
      return state
  }
}
