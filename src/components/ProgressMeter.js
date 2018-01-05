import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ProgressMeter.css'

export default class ProgressMeter extends Component {
  static propTypes = {
    value: PropTypes.string,
  }
  static defaultProps = {
    value: 0,
  }

  render() {
    return (
      <div className="meter">
        <h1>{this.props.value}</h1>
        <span className="meter-text">Completed</span>
      </div>
    )
  }
}
