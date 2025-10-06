import { http } from '../../../shared-kernel/infrastructure/http/http.js'

export class AuthApiService {
  async login(credentials) {
    const response = await http.post('/auth/login', credentials)
    return response
  }

  async signup(userData) {
    const response = await http.post('/auth/signup', userData)
    return response
  }

  async logout() {
    const response = await http.post('/auth/logout')
    return response
  }

  async getCurrentUser() {
    const response = await http.get('/auth/me')
    return response
  }
}
