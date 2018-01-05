import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Stats from './Stats'
import Project from './Project'
import Footer from './Footer'
import './Projects.css'

export default class Projects extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    someProp: PropTypes.string,
  }
  static defaultProps = {
    someProp: 'someValue',
  }

  constructor(props) {
    super(props)
    this.state = {
      someState: true,
    }
  }

  render() {
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
          <ul className="projects-list">
            <Project name="Build Deathstar" />
            <Project name="Crush rebellion" />
            <Project name="Turn Luke to darkside" />
          </ul>

          <Footer />
        </div>
      </div>
    )
  }
}
