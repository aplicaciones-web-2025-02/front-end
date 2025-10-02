import { http } from '../../../shared-kernel/infrastructure/http/http.js'

export class DifficultyApiService {
  async getAll() {
    const response = await http.get('/difficulties')
    return response.data
  }
}
