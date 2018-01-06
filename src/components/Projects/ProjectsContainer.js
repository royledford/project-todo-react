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
      remainingProjectTasks: 0,
      projectTaskCountCompleted: 0,
      projectTaskCountRemaining: 0,
      projectPercentageCompleted: 0,
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
      const tasks = this.state.tasks.filter(task => task.projectId === id)
      return tasks.length
    }
  }

  getTaskCountCompleted = (id = -1) => {
    if (id === -1) {
      // get all
      return this.state.tasks.filter(task => task.complete).length
    } else {
      // get for passed id
      const tasks = this.state.tasks.filter(task => task.projectId === id && task.complete)
      return tasks.length
    }
  }

  getProjectCount = () => {
    return this.state.projects.length
  }

  getPercentageRemaining = () => {
    return 1 - this.getPercentageCompleted()
  }

  getPercentageCompleted = (id = -1) => {
    if (id === -1) {
      // get all
      const complete = this.getTaskCountCompleted()
      const total = this.getTaskCount()
      return complete / total
    } else {
      const complete = this.getTaskCountCompleted(id)
      const total = this.getTaskCount(id)
      return complete / total
    }
  }

  getNextProjectId = () => {
    return maxBy(this.state.projects, 'id').id
  }

  getNextTaskId = () => {
    const projectTasks = this.getProjectTasks(this.state.selectedProject)
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
    const taskCount = this.getTaskCount(id)
    const taskCountCompleted = this.getTaskCountCompleted(id)
    const taskRemaining = taskCount - taskCountCompleted
    const percentageCompleted = this.getPercentageCompleted(id)
    this.setState({
      selectedProject: id,
      selectedProjectName: projectName,
      redirectToTasks: true,
      projectTaskCount: taskCount,
      projectTaskCountCompleted: taskCountCompleted,
      projectTaskCountRemaining: taskRemaining,
      projectPercentageCompleted: percentageCompleted,
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
    const projectId = this.state.selectedProject
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
  }

  render() {
    const {
      projects,
      tasks,
      selectedProject,
      redirectToTasks,
      selectedProjectName,
      projectTaskCount,
      remainingProjectTasks,
      projectTaskCountCompleted,
      projectTaskCountRemaining,
      projectPercentageCompleted,
    } = this.state

    if (redirectToTasks) {
      return (
        <Tasks
          tasks={this.getProjectTasks(selectedProject)}
          projectName={selectedProjectName}
          taskCount={projectTaskCount}
          taskCountCompleted={projectTaskCountCompleted}
          backButtonClick={this.handleShowProject}
          remaingTasks={projectTaskCountRemaining}
          percentageCompleted={projectPercentageCompleted * 100 + '%'}
          addTask={this.handleAddTask}
        />
      )
    } else {
      return (
        <Projects
          projects={this.state.projects}
          projectCount={this.getProjectCount()}
          taskCount={this.getTaskCount()}
          percentageRemaining={Math.floor(this.getPercentageRemaining() * 100) + '%'}
          percentageComplete={Math.floor(this.getPercentageCompleted() * 100) + '%'}
          addProject={this.handleAddProject}
          showTasks={this.handleShowTasks}
        />
      )
    }
  }
}
