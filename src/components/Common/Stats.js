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
          <h2 className="stat-num">{leftText}</h2>
          <span className="stat-text">{leftLabel}</span>
        </div>
        <div className="stat">
          <h2 className="stat-num">{centerText}</h2>
          <span className="stat-text">{centerLabel}</span>
        </div>
        <div className="stat">
          <h2 className="stat-num">{rightText}</h2>
          <span className="stat-text">{rightLabel}</span>
        </div>
      </div>
    )
  }
}
