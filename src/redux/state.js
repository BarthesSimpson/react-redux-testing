import { pluck, toArray } from '../helpers/reshape'
import { delay } from 'redux-saga'
import { put, takeLatest } from 'redux-saga/effects'

/* RESOURCES */
export const ADD_RESOURCE = 'state/resources/ADD_RESOURCE'
export const REMOVE_RESOURCE = 'state/resources/REMOVE_RESOURCE'

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
export function resourcesReducer(state = {}, action = {}) {
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

/* NOTIFICATIONS */
export const SET_NOTIFICATION = 'state/notifications/SET_NOTIFICATION'
export const CLEAR_NOTIFICATION = 'state/notifications/CLEAR_NOTIFICATION'

export function _setNotification(message) {
  return {
    type: SET_NOTIFICATION,
    message
  }
}
export function _clearNotification() {
  return {
    type: CLEAR_NOTIFICATION
  }
}

export function notificationsReducer(state = {}, action) {
  const { type, message } = action
  switch (type) {
    case SET_NOTIFICATION:
      return {
        visible: true,
        message
      }
    case CLEAR_NOTIFICATION:
      return {
        visible: false,
        message: false
      }
    default:
      return state
  }
}

export function* resourceListener() {
  yield takeLatest([ADD_RESOURCE, REMOVE_RESOURCE], notify)
}

export function* notify({ type, resource, id }) {
  const message =
    type === ADD_RESOURCE
      ? `Successfully added new resource ${resource.name}`
      : `Successfully removed resource ${id}`
  yield put(_clearNotification())
  yield put(_setNotification(message))
  yield delay(1500)
  yield put(_clearNotification())
}
