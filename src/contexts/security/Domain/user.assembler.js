import { User } from './user.entity'

export class UserAssembler {
  static toEntityFromResponse(response) {
    if (response.status !== 200 && response.status !== 201) {
      console.error(`${response.status}, ${response.code}, ${response.message}`)
      return null
    }
    return this.toEntityFromResource(response.data)
  }

  static toEntityFromResource(resource) {
    return new User(resource)
  }

  static toLoginResource(username, password) {
    return {
      username,
      password
    }
  }

  static toSignupResource({ username, email, password, firstName, lastName }) {
    return {
      username,
      email,
      password,
      firstName,
      lastName,
      role: 'user',
      isActive: true
    }
  }
}
