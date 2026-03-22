import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
})

export const weatherApi = {
  get: (city) => api.get(`/api/weather/${city}`),
}

export const recommendationApi = {
  get: (occasion, city, bodyType, skinTone, gender) =>
    api.get('/api/recommendations/', {
      params: {
        occasion,
        city,
        body_type: bodyType,
        skin_tone: skinTone,
        gender: gender || 'female',
      }
    }),

  save: (outfitData) =>
    api.post('/api/recommendations/save', outfitData),

  getSaved: (userId) =>
    api.get(`/api/recommendations/saved/${userId}`),

  feedback: (id, feedback) =>
    api.post(`/api/recommendations/${id}/feedback`, null, {
      params: { feedback }
    }),
}

export const authApi = {
  register: (email, password, fullName) =>
    api.post('/api/auth/register', {
      email,
      password,
      full_name: fullName,
    }),

  login: (email, password) => {
    const form = new URLSearchParams()
    form.append('username', email)
    form.append('password', password)
    return axios.post('http://localhost:8080/api/auth/login', form, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  },

  getMe: (userId) => api.get(`/api/auth/me/${userId}`),
}

export default api