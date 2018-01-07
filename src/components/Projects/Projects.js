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
    percentageComplete: PropTypes.number.isRequired,
    addProject: PropTypes.func.isRequired,
    showTasks: PropTypes.func.isRequired,
    projectClicked: PropTypes.func.isRequired,
    selectedProjectId: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
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
      handleChange,
    } = this.props

    const projectsRender = projects.map(project => (
      <Project
        key={project.id}
        id={project.id}
        name={project.title}
        showTasks={showTasks}
        projectClicked={projectClicked}
        handleChange={handleChange}
        selected={project.id === selectedProjectId}
      />
    ))

    return (
      <div className="page-wrap">
        <div className="content-wrap">
          <h1 className="projects-title">Projects</h1>

          <div className="projects-progress">
            <ProgressMeter strokeWidth={10} sqSize={126} percentage={percentageComplete} />
            <span className="meter-label">Completed</span>
          </div>

          <Stats
            leftText={projectCount.toString()}
            leftLabel="Projects"
            centerText={taskCount.toString()}
            centerLabel="Tasks"
            rightText={percentageRemaining}
            rightLabel="Remaining"
          />

          <div className="projects-list">{projectsRender}</div>

          <Footer add={addProject} />
        </div>
      </div>
    )
  }
}
