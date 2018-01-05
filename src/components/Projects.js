import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Stats from './Stats'
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
            posOneLabel="Projects"
            PosOneText="20"
            posTwoLabel="Projects"
            PosTwoText="20"
            posThreeLabel="Projects"
            PosThreeText="20"
          />
          <ol className="projects-list">
            <li className="list-item">Build Deathstar</li>
            <li className="list-item">Crush rebellion</li>
            <li className="list-item">Turn Luke to darkside</li>
          </ol>

          <footer className="footer">
            <a href="#" className="footer-icon">
              edit
            </a>
            <a href="#" className="footer-icon-lrg">
              +
            </a>
            <a href="#" className="footer-icon">
              trash
            </a>
          </footer>
        </div>
      </div>
    )
  }
}
