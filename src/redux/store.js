import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { resourcesReducer, notificationsReducer } from './state'
import createSagaMiddleware from 'redux-saga'
import { resourceListener } from './state'

const sagaMiddleware = createSagaMiddleware()

export default () => {
  const store = createStore(
    combineReducers({
      resources: resourcesReducer,
      notifications: notificationsReducer
    }),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )
  sagaMiddleware.run(resourceListener)
  return store
}
