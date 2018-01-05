import React, { Component } from 'react'
import Projects from './Projects'
import ProjectApi from '../data/ProjectsApi'

export default class ProjectsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
    }
  }

  componentWillMount() {
    const projects = ProjectApi.getProjects()
    this.setState({ projects })
  }

  render() {
    return <Projects projects={this.state.projects} />
  }
}
