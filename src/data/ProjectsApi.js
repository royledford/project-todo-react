import { projects } from './projects'
import { sortBy } from 'lodash'

class ProjectsApi {
  static getProjects = () => {
    return sortBy(projects, 'sortString')
  }
}

export default ProjectsApi
