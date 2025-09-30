import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export class TutorialApiService {
  async GetAll() {
    const response = await axios.get(`${BASE_URL}/tutorials`)
    return response.data
  }

  async GetById(id) {
    const response = await axios.get(`${BASE_URL}/tutorials/${id}`)
    return response.data
  }

  async Create(tutorial) {
    const response = await axios.post(`${BASE_URL}/tutorials`, tutorial)
    return response.data
  }

  async Update(id, tutorial) {
    const response = await axios.put(`${BASE_URL}/tutorials/${id}`, tutorial)
    return response.data
  }

  async Delete(id) {
    const response = await axios.delete(`${BASE_URL}/tutorials/${id}`)
    return response.data
  }
}
