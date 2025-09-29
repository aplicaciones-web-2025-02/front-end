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

  async GetCategories() {
    const response = await axios.get(`${BASE_URL}/categories`)
    return response.data
  }

  async GetDifficulties() {
    const response = await axios.get(`${BASE_URL}/difficulties`)
    return response.data
  }

  async GetTags() {
    const response = await axios.get(`${BASE_URL}/tags`)
    return response.data
  }
}
