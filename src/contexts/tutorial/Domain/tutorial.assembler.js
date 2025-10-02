import { Tutorial } from './tutorial.entity'

export class TutorialAssembler {
  static toEntitiesFromResponse(response) {
    if (response.status !== 200) {
      console.error(`${response.status}, ${response.code}, ${response.message}`)
      return []
    }
    const tutorialsResponse = response.data
    return tutorialsResponse.map((tutorial) => this.toEntityFromResource(tutorial))
  }

  static toEntityFromResource(resource) {
    return new Tutorial(resource)
  }
}
