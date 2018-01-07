import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProgressMeter from '../Common/ProgressMeter'
import Stats from '../Common/Stats'
import Footer from '../Common/Footer'
import Task from './Task'
import './Tasks.css'

export default class Tasks extends Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        task: PropTypes.string,
        projectId: PropTypes.number,
        complete: PropTypes.bool,
      })
    ),
    backButtonClick: PropTypes.func.isRequired,
    projectName: PropTypes.string.isRequired,
    addTask: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      taskCount: '0',
      taskCountCompleted: '0',
      taskCountRemaining: '0',
      percentageCompleted: 0,
    }
  }

  componentDidMount() {
    this.refreshUi(this.props.tasks)
  }

  componentWillReceiveProps(nextProps) {
    this.refreshUi(nextProps.tasks)
  }

  refreshUi = tasks => {
    const taskCount = this.getTaskCount(tasks)
    const countCompleted = this.getTaskCountCompleted(tasks)
    let percentageCompleted = 0
    if (taskCount > 0) {
      percentageCompleted = Math.floor(countCompleted / taskCount * 100)
    }
    this.setState({
      taskCount: tasks.length.toString(),
      taskCountCompleted: countCompleted.toString(),
      taskCountRemaining: (taskCount - countCompleted).toString(),
      percentageCompleted: percentageCompleted,
    })
  }

  getTaskCount = tasks => {
    return tasks.length
  }

  getTaskCountCompleted = tasks => {
    return tasks.filter(task => task.complete).length
  }

  render() {
    const { tasks, projectName, backButtonClick, addTask, onClick, onChange } = this.props

    const { taskCount, taskCountCompleted, taskCountRemaining, percentageCompleted } = this.state

    const tasksRender = tasks.map(task => (
      <Task
        key={task.id}
        id={task.id}
        value={task.task}
        onClick={onClick}
        onChange={onChange}
        complete={task.complete}
      />
    ))

    return (
      <div className="page-wrap">
        <div className="content-wrap">
          <h1 className="projects-title">{projectName}</h1>
          {/* <ProgressMeter value={percentageCompleted} /> */}
          <div className="projects-progress">
            <ProgressMeter strokeWidth={10} sqSize={126} percentage={percentageCompleted} />
            <span className="meter-label">Completed</span>
          </div>

          <Stats
            leftText={taskCountCompleted}
            leftLabel="Complete"
            centerText={taskCountRemaining}
            centerLabel="Remaining"
            rightText={taskCount}
            rightLabel="Total"
          />

          <div className="projects-list">{tasksRender}</div>

          <Footer add={addTask} showBackButton={true} onLeftIconClick={backButtonClick} />
        </div>
      </div>
    )
  }
}
