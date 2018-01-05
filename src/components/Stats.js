import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Stats.css'

export default class Stats extends Component {
  static propTypes = {
    posOneLabel: PropTypes.string.isRequired,
    posOneText: PropTypes.string.isRequired,
    posTwoLabel: PropTypes.string.isRequired,
    posTwoText: PropTypes.string.isRequired,
    posThreeLabel: PropTypes.string.isRequired,
    posThreeText: PropTypes.string.isRequired,
  }

  render() {
    const { posOneLabel, posOneText, posTwoLabel, posTwoText, posThreeLabel, posThreeText } = this.props
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
