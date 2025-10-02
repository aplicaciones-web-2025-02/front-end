﻿import { http } from '../../../shared-kernel/infrastructure/http/http.js'

export class TutorialApiService {
  async getAll() {
    const response = await http.get('/tutorials')
    return response
  }

  async getById(id) {
    const response = await http.get(`/tutorials/${id}`)
    return response
  }

  async create(tutorial) {
    const response = await http.post('/tutorials', tutorial)
    return response
  }

  async update(id, tutorial) {
    const response = await http.patch(`/tutorials/${id}`, tutorial)
    return response
  }

  async delete(id) {
    const response = await http.delete(`/tutorials/${id}`)
    return response
  }
}
