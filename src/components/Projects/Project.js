import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FaCaretRight from 'react-icons/lib/fa/caret-right'
import './Project.css'

export default class Project extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    showTasks: PropTypes.func.isRequired,
  }
  static defaultProps = {
    name: 'New Project',
  }

  handleShowTasks = () => {
    this.props.showTasks(this.props.id)
  }

  render() {
    const { name } = this.props
    return (
      <li className="list-item">
        {name}
        <FaCaretRight className="project-icon" onClick={this.handleShowTasks} />
      </li>
    )
  }
}
