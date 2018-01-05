import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Stats from './Stats'
import Project from './Project'
import Footer from './Footer'
import './Projects.css'

export default class Projects extends Component {
  static propTypes = {
    projects: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  }
  static defaultProps = {
    // someProp: 'someValue',
  }

  render() {
    const { projects } = this.props
    const projectsRender = projects.map(project => <Project key={project.id} name={project.title} />)

    return (
      <div className="page-wrap">
        <div className="content-wrap">
          <h1 className="projects-title">Projects</h1>
          <div className="projects-progress" />

          <Stats
            leftLabel="Projects"
            leftText="20"
            centerLabel="Projects"
            centerText="20"
            rightLabel="Projects"
            rightText="20"
          />

          <ul className="projects-list">{projectsRender}</ul>

          <Footer />
        </div>
      </div>
    )
  }
}
