import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Stats.css'

export default class Stats extends Component {
  static propTypes = {
    leftLabel: PropTypes.string.isRequired,
    leftText: PropTypes.string.isRequired,
    centerLabel: PropTypes.string.isRequired,
    centerText: PropTypes.string.isRequired,
    rightLabel: PropTypes.string.isRequired,
    rightText: PropTypes.string.isRequired,
  }

  render() {
    const { leftLabel, leftText, centerLabel, centerText, rightLabel, rightText } = this.props
    return (
      <div className="stat-wrap">
        <div className="stat">
          <h2 className="stat-num">20</h2>
          <span className="stat-text">Projects</span>
        </div>
        <div className="stat">
          <h2 className="stat-num">25</h2>
          <span className="stat-text">Tasks</span>
        </div>
        <div className="stat">
          <h2 className="stat-num">32%</h2>
          <span className="stat-text">Remaining</span>
        </div>
      </div>
    )
  }
}
