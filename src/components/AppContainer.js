import React, { Component } from 'react'
import Projects from './Projects/Projects'
import Tasks from './Tasks/Tasks'
import ProjectApi from '../data/ProjectsApi'
import TasksApi from '../data/tasksApi'
import { maxBy } from 'lodash'

export default class ProjectsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      tasks: [],
      selectedProjectId: 1,
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

  getNextTaskId = () => {
    const projectTasks = this.getProjectTasks(this.state.selectedProjectId)
    return maxBy(projectTasks, 'id').id
  }

  getProjectTasks = id => {
    return this.state.tasks.filter(task => task.projectId === id)
  }

  //----------------------------
  // Code for the app
  //----------------------------
  handleShowTasks = id => {
    const projectName = this.state.projects.filter(project => project.id === id)[0].title
    this.setState({
      selectedProjectId: id,
      selectedProjectName: projectName,
      redirectToTasks: true,
    })
  }

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

  handleShowProject = () => {
    this.setState({ redirectToTasks: false })
  }

  handleAddTask = () => {
    const projectId = this.state.selectedProjectId
    const highestID = this.getNextTaskId(projectId)
    const newTask = {
      id: highestID + 1,
      task: 'New task',
      projectId: projectId,
      complete: false,
    }
    const tasks = Object.assign([], this.state.tasks)
    tasks.push(newTask)
    this.setState({ tasks })
    this.handleShowTasks(projectId)
  }

  handleProjectClicked = projId => {
    this.setState({ selectedProjectId: projId })
  }

  render() {
    const { projects, selectedProjectId, redirectToTasks, selectedProjectName } = this.state

    if (redirectToTasks) {
      return (
        <Tasks
          tasks={this.getProjectTasks(selectedProjectId)}
          projectName={selectedProjectName}
          backButtonClick={this.handleShowProject}
          addTask={this.handleAddTask}
        />
      )
    } else {
      return (
        <Projects
          projects={projects}
          selectedProjectId={selectedProjectId}
          projectCount={this.getProjectCount()}
          taskCount={this.getTaskCount()}
          percentageRemaining={Math.floor(this.getPercentageRemaining() * 100) + '%'}
          percentageComplete={Math.floor(this.getPercentageCompleted() * 100) + '%'}
          addProject={this.handleAddProject}
          showTasks={this.handleShowTasks}
          projectClicked={this.handleProjectClicked}
        />
      )
    }
  }
}
