import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import ProjectsContainer from './components/ProjectsContainer'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ProjectsContainer} />
        </Switch>
      </Router>
    )
  }
}

export default App
