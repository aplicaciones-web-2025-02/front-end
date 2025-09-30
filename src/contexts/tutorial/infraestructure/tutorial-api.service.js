import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export class TutorialApiService {
  async GetAll() {
    const response = await axios.get(`${BASE_URL}/tutorials`)
    return response
  }

  async GetById(id) {
    const response = await axios.get(`${BASE_URL}/tutorials/${id}`)
    return response
  }

  async Create(tutorial) {
    const response = await axios.post(`${BASE_URL}/tutorials`, tutorial)
    return response
  }
}
