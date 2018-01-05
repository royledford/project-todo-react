import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Stats from './Stats'
import Project from './Project'
import ProgressMeter from './ProgressMeter'
import Footer from './Footer'
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
  }

  render() {
    const { projects, projectCount, taskCount, percentageRemaining, percentageComplete, addProject } = this.props
    const projectsRender = projects.map(project => <Project key={project.id} name={project.title} />)
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
