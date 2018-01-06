import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppContainer from './components/AppContainer'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AppContainer} />
        </Switch>
      </Router>
    )
  }
}

export default App
