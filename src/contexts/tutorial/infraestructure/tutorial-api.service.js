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

  async Update(id, tutorial) {
    const response = await axios.patch(`${BASE_URL}/tutorials/${id}`, tutorial)
    return response
  }

  async Delete(id) {
    const response = await axios.delete(`${BASE_URL}/tutorials/${id}`)
    return response
  }
}
