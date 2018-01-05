import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Task.css'

export default class Task extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    someProp: PropTypes.string,
  }
  static defaultProps = {
    someProp: 'someValue',
  }

  constructor(props) {
    super(props)
    this.state = {
      someState: true,
    }
  }

  render() {
    const { name } = this.props
    return <li className="list-item">{name}</li>
  }
}
