import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Projects from './Projects'

export default class ProjectsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [
        {
          id: 1,
          title: 'Build Deathstar',
        },
      ],
      tasks: [
        {
          id: 1,
          task: 'Construct exterior',
          projectId: 1,
          complete: true,
        },
        {
          id: 2,
          task: 'Avoid Darth Vader',
          projectId: 1,
          complete: true,
        },
        {
          id: 3,
          task: 'Build super laser',
          projectId: 1,
          complete: true,
        },
        {
          id: 4,
          task: 'Proect exhaust port',
          projectId: 1,
          complete: false,
        },
      ],
    }
  }

  render() {
    return <Projects projects={this.state.Projects} />
  }
}
