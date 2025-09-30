import { http } from '../../../shared-kernel/infrastructure/http/http.js'

export class CategoryApiService {
  async GetAll() {
    const response = await http.get('/categories')
    return response.data
  }
}
