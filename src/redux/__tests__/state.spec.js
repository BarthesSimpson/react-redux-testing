import { Reducer } from 'redux-testkit'
import SagaTester from 'redux-saga-tester'
import {
  _addResource,
  _clearNotification,
  _removeResource,
  _setNotification,
  CLEAR_NOTIFICATION,
  SET_NOTIFICATION,
  notificationsReducer,
  resourcesReducer
} from '../state'

describe('Resources reducer tests', () => {
  it('Adds a resource', () => {
    Reducer(resourcesReducer)
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
    Reducer(resourcesReducer)
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
    Reducer(resourcesReducer)
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

describe('Notifications reducer tests', () => {
  it('Sets a notification', () => {
    Reducer(notificationsReducer)
      .withState({})
      .expect(_setNotification("You've got mail"))
      .toReturnState({
        visible: true,
        message: "You've got mail"
      })
  })
  it('Clears a notification', () => {
    Reducer(notificationsReducer)
      .withState({
        visible: true,
        message: "You've got mail"
      })
      .expect(_clearNotification())
      .toReturnState({
        visible: false,
        message: false
      })
  })
})

describe('Saga tests', () => {
  it('Shows a notification when user adds a new resource', async () => {
    const sagaTester = new SagaTester({
      initialState: { notifications: {}, resources: {} },
      reducers: {
        notifications: notificationsReducer,
        resources: resourcesReducer
      }
    })
    const resourceListener = require('../state').resourceListener
    sagaTester.start(resourceListener)
    sagaTester.dispatch(_addResource({ name: 'Franklin Delano Roosevelt' }))
    await sagaTester.waitFor(CLEAR_NOTIFICATION)
    const { message } = await sagaTester.waitFor(SET_NOTIFICATION)
    expect(message).toBe(
      'Successfully added new resource Franklin Delano Roosevelt'
    )
    const { notifications } = sagaTester.getState()
    expect(notifications.visible).toBe(true)
    /* Expect clear notification to be called a second time */
    await sagaTester.waitFor(CLEAR_NOTIFICATION, true)
  })
  it('Shows a notification when user removes a resource', async () => {
    const sagaTester = new SagaTester({
      initialState: {
        notifications: {},
        resources: { 1: { id: 1, name: 'John Leguizamo' } }
      },
      reducers: {
        notifications: notificationsReducer,
        resources: resourcesReducer
      }
    })
    const resourceListener = require('../state').resourceListener
    sagaTester.start(resourceListener)
    sagaTester.dispatch(_removeResource(1))
    await sagaTester.waitFor(CLEAR_NOTIFICATION)
    const { message } = await sagaTester.waitFor(SET_NOTIFICATION)
    expect(message).toBe('Successfully removed resource 1')
    const { notifications } = sagaTester.getState()
    expect(notifications.visible).toBe(true)
    /* Expect clear notification to be called a second time */
    await sagaTester.waitFor(CLEAR_NOTIFICATION, true)
  })
})
