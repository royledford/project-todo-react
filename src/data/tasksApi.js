import { taskData } from './tasks'
import { sortBy } from 'lodash'

class TasksApi {
  static getProjects = () => {
    return sortBy(taskData, 'sortString')
  }
}

export default TasksApi
