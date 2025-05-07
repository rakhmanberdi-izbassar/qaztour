import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // Cookie файлдарын жіберу үшін (егер қолданылса)
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') // Токенді сақтау орнына қарай өзгертіңіз
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
