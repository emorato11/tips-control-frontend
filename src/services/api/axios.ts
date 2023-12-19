import axios from 'axios'

const apiInstance = axios.create({
  baseURL: 'https://tips-control-backend.onrender.com/',
  // baseURL: 'http://localhost:8080/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})

export { apiInstance }
