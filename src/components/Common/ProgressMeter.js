import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ProgressMeter.css'

export default class ProgressMeter extends Component {
  static propTypes = {
    percentage: PropTypes.number.isRequired,
    sqSize: PropTypes.number,
    strokeWidth: PropTypes.number,
  }
  static defaultProps = {
    sqSize: 200,
    strokeWidth: 10,
  }

  render() {
    const { sqSize, strokeWidth, percentage } = this.props

    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (sqSize - strokeWidth) / 2
    const viewBox = `0 0 ${sqSize} ${sqSize}`

    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * percentage / 100

    return (
      <svg width={sqSize} height={sqSize} viewBox={viewBox}>
        <circle
          className="circle-background"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          className="circle-progress"
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
        <text className="circle-text" x="50%" y="50%" dy=".3em" textAnchor="middle">
          {`${percentage}%`}
        </text>
      </svg>
    )
  }
}
