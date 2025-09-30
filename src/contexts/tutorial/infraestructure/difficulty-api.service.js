import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export class DifficultyApiService {
  async GetAll() {
    const response = await axios.get(`${BASE_URL}/difficulties`)
    return response.data
  }
}
