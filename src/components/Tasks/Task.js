import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../Common/Checkbox'
import './Task.css'

export default class Task extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    complete: PropTypes.bool.isRequired,
  }

  handleClick = e => {
    this.props.onClick(this.props.id)
  }

  render() {
    const { id, value, onChange, complete } = this.props
    // console.log(complete)
    return (
      <div className="list-item" onClick={e => this.handleClick(e)}>
        <input
          value={value}
          type="text"
          className="list-input"
          onChange={onChange}
          onClick={e => this.handleClick(e)}
        />
        <Checkbox id={`complete-${id}`} checked={complete} onChange={() => {}} />
      </div>
    )
  }
}
