import axios from 'axios'

export const BASE_URL = 'http://localhost:3000/444'

export const http = axios.create({
  baseURL: BASE_URL,
})
