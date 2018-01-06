import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FaCaretRight from 'react-icons/lib/fa/caret-right'
import './Project.css'

export default class Project extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    showTasks: PropTypes.func.isRequired,
    projectClicked: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
  }
  static defaultProps = {
    name: 'New Project',
  }

  handleShowTasks = () => {
    this.props.showTasks(this.props.id)
  }

  handleClick = e => {
    this.props.projectClicked(this.props.id)
  }

  render() {
    const { name, projectClicked, selected, handleChange } = this.props
    const classOveride = selected ? 'list-item-selected' : ''
    return (
      <div className="list-item">
        <input
          value={name}
          type="text"
          className="list-input"
          onChange={e => handleChange(e)}
          onClick={e => this.handleClick(e)}
        />
        <FaCaretRight className="list-icon" onClick={this.handleShowTasks} />
      </div>
    )
  }
}
