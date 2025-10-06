export class User {
  constructor({
    id = '',
    username = '',
    email = '',
    password = '',
    firstName = '',
    lastName = '',
    avatar = '',
    role = 'user',
    isActive = true,
    createdAt = '',
    updatedAt = '',
  }) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
    this.firstName = firstName
    this.lastName = lastName
    this.avatar = avatar
    this.role = role
    this.isActive = isActive
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
