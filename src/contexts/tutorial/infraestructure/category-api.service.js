import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export class CategoryApiService {
  async GetAll() {
    const response = await axios.get(`${BASE_URL}/categories`)
    return response.data
  }
}
