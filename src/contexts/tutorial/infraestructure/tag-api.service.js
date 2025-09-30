import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export class TagApiService {
  async GetAll() {
    const response = await axios.get(`${BASE_URL}/tags`)
    return response.data
  }
}
