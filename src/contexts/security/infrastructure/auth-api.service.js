import { http } from '../../../shared-kernel/infrastructure/http/http.js'

export class AuthApiService {
  async login(credentials) {
    const response = await http.post('/login', credentials)
    return response
  }

  async signup(userData) {
    const response = await http.post('/signup', userData)
    return response
  }

  async logout() {
    const response = await http.post('/logout')
    return response
  }

  async getCurrentUser() {
    const response = await http.get('/me')
    return response
  }
}
