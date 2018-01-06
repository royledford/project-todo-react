import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaPlus from 'react-icons/lib/fa/plus'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaCaretLeft from 'react-icons/lib/fa/caret-left'
import './Footer.css'

export default class Footer extends Component {
  static propTypes = {
    add: PropTypes.func.isRequired,
    showBackButton: PropTypes.bool,
    onBackClick: PropTypes.func,
  }
  static defaultProps = {
    showBackButton: false,
    onBackClick: () => {},
  }

  render() {
    const { add, showBackButton, onBackClick } = this.props

    let leftButton = <FaPencil />
    if (showBackButton) {
      leftButton = <FaCaretLeft />
    }

    return (
      <footer className="footer">
        <div className="footer-icon" onClick={onBackClick}>
          {leftButton}
        </div>
        <div className="footer-featured" onClick={add}>
          <FaPlus />
        </div>
        <div className="footer-icon">
          <FaTrashO />
        </div>
      </footer>
    )
  }
}
