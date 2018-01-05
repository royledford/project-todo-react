import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaPlus from 'react-icons/lib/fa/plus'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import './Footer.css'

export default class Footer extends Component {
  static propTypes = {
    add: PropTypes.func.isRequired,
  }

  render() {
    const { add } = this.props

    return (
      <footer className="footer">
        <a href="/" className="footer-icon">
          <FaPencil />
        </a>
        <div className="footer-featured" onClick={add}>
          <FaPlus />
        </div>
        <a href="/" className="footer-icon">
          <FaTrashO />
        </a>
      </footer>
    )
  }
}
