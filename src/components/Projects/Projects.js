import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Stats from '../Common/Stats'
import Project from './Project'
import ProgressMeter from '../Common/ProgressMeter'
import Footer from '../Common/Footer'
import './Projects.css'

export default class Projects extends Component {
  static propTypes = {
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      })
    ),
    projectCount: PropTypes.number.isRequired,
    taskCount: PropTypes.number.isRequired,
    percentageRemaining: PropTypes.string.isRequired,
    percentageComplete: PropTypes.string.isRequired,
    addProject: PropTypes.func.isRequired,
    showTasks: PropTypes.func.isRequired,
    projectClicked: PropTypes.func.isRequired,
    selectedProjectId: PropTypes.number.isRequired,
  }

  render() {
    const {
      projects,
      projectCount,
      taskCount,
      percentageRemaining,
      percentageComplete,
      addProject,
      showTasks,
      projectClicked,
      selectedProjectId,
    } = this.props

    const projectsRender = projects.map(project => (
      <Project
        key={project.id}
        id={project.id}
        name={project.title}
        showTasks={showTasks}
        projectClicked={projectClicked}
        selected={project.id === selectedProjectId}
      />
    ))

    return (
      <div className="page-wrap">
        <div className="content-wrap">
          <h1 className="projects-title">Projects</h1>
          <ProgressMeter value={percentageComplete} />

          <Stats
            leftText={projectCount.toString()}
            leftLabel="Projects"
            centerText={taskCount.toString()}
            centerLabel="Tasks"
            rightText={percentageRemaining}
            rightLabel="Remaining"
          />

          <ul className="projects-list">{projectsRender}</ul>

          <Footer add={addProject} />
        </div>
      </div>
    )
  }
}
