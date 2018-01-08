import React, { Component } from 'react'
import Projects from './Projects/Projects'
import Tasks from './Tasks/Tasks'
import ProjectsApi from '../data/ProjectsApi'
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
      selectedTaskId: 0,
    }

    this.handleAddProject = this.handleAddProject.bind(this)
    this.getProjectTasks = this.getProjectTasks.bind(this)
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    const projects = ProjectsApi.getProjects()
    const tasks = TasksApi.getTasks()
    this.setState({ projects, tasks })
  }

  //----------------------------
  // Helper methods for the data (a real backend/api should provide most of these)
  //----------------------------
  getTaskCount = () => {
    return this.state.tasks.length
  }

  getTaskCountCompleted = () => {
    return this.state.tasks.filter(task => task.complete).length
  }

  getNextTaskId = () => {
    const projectTasks = this.getProjectTasks(this.state.selectedProjectId)
    let nextId = 0
    if (projectTasks.length > 0) nextId = maxBy(projectTasks, 'id').id
    return nextId
  }

  updateTaskName = (id, value) => {
    const tasks = Object.assign([], this.state.tasks)
    const index = tasks.findIndex(o => o.id === id)
    tasks[index].task = value
    this.setState({ tasks })
  }

  updateTaskCompleted = id => {
    const tasks = Object.assign([], this.state.tasks)
    const index = tasks.findIndex(o => o.id === id)
    tasks[index].complete = !tasks[index].complete
    this.setState({ tasks })
  }

  getProjectCount = () => {
    return this.state.projects.length
  }

  getPercentageRemaining = () => {
    return 100 - this.getPercentageCompleted()
  }

  getPercentageCompleted = () => {
    const complete = this.getTaskCountCompleted()
    const total = this.getTaskCount()
    if (total <= 0) {
      return 0
    } else {
      return Math.floor(complete / total * 100)
    }
  }

  getNextProjectId = () => {
    return maxBy(this.state.projects, 'id').id
  }

  getProjectTasks = id => {
    return this.state.tasks.filter(task => task.projectId === id)
  }

  updateProjectName = (id, value) => {
    const projects = Object.assign([], this.state.projects)
    const index = projects.findIndex(o => o.id === id)
    projects[index].title = value
    this.setState({ projects })
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

  handleProjectClicked = projId => {
    this.setState({ selectedProjectId: projId })
  }

  handleProjectChanged = e => {
    e.preventDefault()
    this.updateProjectName(this.state.selectedProjectId, e.target.value)
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

  handleTaskClicked = id => {
    this.setState({ selectedTaskId: id })
  }

  handleTaskChanged = e => {
    e.preventDefault()
    this.updateTaskName(this.state.selectedTaskId, e.target.value)
  }

  handleTaskChecked = id => {
    this.updateTaskCompleted(id)
  }

  render() {
    const { projects, selectedProjectId, redirectToTasks, selectedProjectName } = this.state

    if (redirectToTasks) {
      const projectTasks = this.getProjectTasks(selectedProjectId)
      debugger
      return (
        <Tasks
          tasks={projectTasks}
          projectName={selectedProjectName}
          backButtonClick={this.handleShowProject}
          addTask={this.handleAddTask}
          onClick={this.handleTaskClicked}
          onChange={this.handleTaskChanged}
          onChecked={this.handleTaskChecked}
        />
      )
    } else {
      return (
        <Projects
          projects={projects}
          selectedProjectId={selectedProjectId}
          projectCount={this.getProjectCount()}
          taskCount={this.getTaskCount()}
          percentageRemaining={this.getPercentageRemaining() + '%'}
          percentageComplete={this.getPercentageCompleted()}
          addProject={this.handleAddProject}
          showTasks={this.handleShowTasks}
          projectClicked={this.handleProjectClicked}
          handleChange={this.handleProjectChanged}
          refresh={this.loadData}
        />
      )
    }
  }
}
