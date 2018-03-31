import React, { Component } from 'react'
import { Provider } from 'react-redux'
import reduxStoreInstance from './redux/store'
import './App.css'
import Page from './components/Page'
import ReduxPage from './components/ReduxPage'

const store = reduxStoreInstance()

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 data-testid="title">Greetings</h1>
        <Page />
        <Provider store={store}>
          <ReduxPage />
        </Provider>
      </div>
    )
  }
}

export default App
