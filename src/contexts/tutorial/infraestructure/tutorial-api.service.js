import { http } from '../../../shared-kernel/infrastructure/http/http.js'

export class TutorialApiService {
  async getAll() {
    const response = await http.get('/660/tutorials')
    return response
  }

  async getById(id) {
    const response = await http.get(`/660/tutorials/${id}`)
    return response
  }

  async create(tutorial) {
    const response = await http.post('/660/tutorials', tutorial)
    return response
  }

  async update(id, tutorial) {
    const response = await http.patch(`/660/tutorials/${id}`, tutorial)
    return response
  }

  async delete(id) {
    const response = await http.delete(`/660/tutorials/${id}`)
    return response
  }
}
