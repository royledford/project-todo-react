import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProgressMeter from '../Common/ProgressMeter'
import Stats from '../Common/Stats'
import Footer from '../Common/Footer'
import Task from './Task'
import './Tasks.css'

export default class Tasks extends Component {
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
    const { tasks, projectName, taskCount } = this.props
    const tasksRender = tasks.map(task => <Task key={task.id} id={task.id} name={task.task} />)
    return (
      <div className="page-wrap">
        <div className="content-wrap">
          <h1 className="projects-title">{projectName}</h1>
          <ProgressMeter value="22" />

          <Stats
            leftText={taskCount}
            leftLabel="Complete"
            centerText="200"
            centerLabel="Remaining"
            rightText="33"
            rightLabel="Total"
          />

          <ul className="projects-list">{tasksRender}</ul>

          <Footer add={() => {}} />
        </div>
      </div>
    )
  }
}
