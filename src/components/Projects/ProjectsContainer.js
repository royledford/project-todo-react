import React, { Component } from 'react'
import Projects from './Projects'
import Tasks from '../Tasks/Tasks'
import ProjectApi from '../../data/ProjectsApi'
import TasksApi from '../../data/tasksApi'
import { maxBy } from 'lodash'

export default class ProjectsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      tasks: [],
      selectedProject: 0,
      redirectToTasks: false,
      selectedProjectName: '',
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
  getTaskCount = (id = -1) => {
    if (id === -1) {
      // get all
      return this.state.tasks.length
    } else {
      // get for passed id
      const projectCompleted = this.state.tasks.filter(task => task.projectId === id && task.complete)
      return projectCompleted.length
    }
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
    const projectName = this.state.projects.filter(project => project.id === id)[0].title
    const projectTaskCount = this.getTaskCount(id)
    this.setState({
      selectedProject: id,
      selectedProjectName: projectName,
      redirectToTasks: true,
      projectTaskCount: projectTaskCount,
    })
  }

  //----------------------------
  // Code for the app
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
    const { projects, tasks, selectedProject, redirectToTasks, selectedProjectName, projectTaskCount } = this.state

    if (redirectToTasks) {
      return <Tasks tasks={tasks} projectName={selectedProjectName} taskCount={projectTaskCount} />
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
