import { tasks } from './tasks'
import { sortBy } from 'lodash'

class TasksApi {
  static getTasks = () => {
    return sortBy(tasks, 'sortString')
  }
}

export default TasksApi
