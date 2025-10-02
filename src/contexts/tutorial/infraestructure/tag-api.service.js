import { http } from '../../../shared-kernel/infrastructure/http/http.js'

export class TagApiService {
  async getAll() {
    const response = await http.get('/tags')
    return response.data
  }
}
