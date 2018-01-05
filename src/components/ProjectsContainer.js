import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Projects from './Projects'
import ProjectApi from '../data/ProjectsApi'
import TasksApi from '../data/tasksApi'
import { maxBy } from 'lodash'

export default class ProjectsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      tasks: [],
      selectedProject: 0,
      redirectToTasks: false,
    }

    this.handleAddProject = this.handleAddProject.bind(this)
  }

  componentDidMount() {
    const projects = ProjectApi.getProjects()
    const tasks = TasksApi.getTasks()
    this.setState({ projects, tasks })
  }

  //----------------------------
  // Helper methods for the data (a real api should provide these)
  //----------------------------
  getTaskCount = () => {
    return this.state.tasks.length
  }

  getTaskCountCompleted = () => {
    return this.state.tasks.filter(task => task.complete).length
  }

  getProjectCount = () => {
    return this.state.projects.length
  }

  getPercentageRemaining = () => {
    return 1 - this.getPercentageCompleted()
  }

  getPercentageCompleted = () => {
    const complete = this.getTaskCountCompleted()
    const total = this.getTaskCount()
    return complete / total
  }

  getNextProjectId = () => {
    return maxBy(this.state.projects, 'id').id
  }

  handleShowTasks = id => {
    this.setState({ selectedProject: id, redirectToTasks: true })
  }

  //----------------------------
  // Cod for the app
  //----------------------------
  handleAddProject = () => {
    const highestID = this.getNextProjectId()
    const newProject = {
      id: highestID + 1,
      title: 'New Project',
    }
    const projects = Object.assign([], this.state.projects)
    projects.push(newProject)
    this.setState({ projects })
  }

  render() {
    const { projects, selectedProject, redirectToTasks } = this.state

    if (redirectToTasks) {
      const newPath = '/tasks/' + selectedProject
      return <Redirect to={newPath} />
    } else {
      return (
        <Projects
          projects={this.state.projects}
          projectCount={this.getProjectCount()}
          taskCount={this.getTaskCount()}
          percentageRemaining={this.getPercentageRemaining() * 100 + '%'}
          percentageComplete={this.getPercentageCompleted() * 100 + '%'}
          addProject={this.handleAddProject}
          showTasks={this.handleShowTasks}
        />
      )
    }
  }
}
