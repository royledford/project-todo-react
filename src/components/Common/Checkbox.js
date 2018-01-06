import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Checkbox.css'

export default class Checkbox extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const { id, name, disabled, checked, onChange } = this.props
    return (
      <label htmlFor={id} className="checkbox checkbox-check">
        <input type="checkbox" name={name} id={id} checked={checked} disabled={disabled} onChange={onChange} />
        <div className="checkbox-box" />
      </label>
    )
  }
}
