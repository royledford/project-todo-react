import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../Common/Checkbox'
import './Task.css'

export default class Task extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onChecked: PropTypes.func.isRequired,
  }

  handleClick = e => {
    this.props.onClick(this.props.id)
  }

  handleCheckChanged = e => {
    // e.preventDefault()
    this.props.onChecked(this.props.id)
  }

  render() {
    const { id, value, onChange, complete } = this.props

    return (
      <div className="list-item" onClick={e => this.handleClick(e)}>
        <input
          value={value}
          type="text"
          className="list-input"
          onChange={onChange}
          onClick={e => this.handleClick(e)}
        />
        <Checkbox id={`complete-${id}`} checked={complete} onChange={this.handleCheckChanged} />
      </div>
    )
  }
}
