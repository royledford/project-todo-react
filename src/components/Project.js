import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FaCaretRight from 'react-icons/lib/fa/caret-right'
import './Project.css'

export default class Project extends Component {
  static propTypes = {
    name: PropTypes.string,
  }
  static defaultProps = {
    name: 'New Project',
  }

  render() {
    const { name } = this.props
    return (
      <li className="list-item">
        {name}
        <FaCaretRight className="project-icon" />
      </li>
    )
  }
}
