import { http } from '../../../shared-kernel/infrastructure/http/http.js'

export class CategoryApiService {
  async getAll() {
    const response = await http.get('/categories')
    return response.data
  }
}
