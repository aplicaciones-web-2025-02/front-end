import { http, BASE_URL } from '../../../shared-kernel/infrastructure/http/http.js'

export class TutorialApiService {
  async GetAll() {
    const response = await http.get('/tutorials')
    return response
  }

  async GetById(id) {
    const response = await http.get(`/tutorials/${id}`)
    return response
  }

  async Create(tutorial) {
    const response = await http.post('/tutorials', tutorial)
    return response
  }

  async Update(id, tutorial) {
    const response = await http.patch(`/tutorials/${id}`, tutorial)
    return response
  }

  async Delete(id) {
    const response = await http.delete(`/tutorials/${id}`)
    return response
  }
}
