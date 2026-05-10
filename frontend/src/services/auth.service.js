import axios from 'axios'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api/auth/'

export const signin = (username, password) =>
  axios.post(API_URL + 'signin', { username, password })

export const signup = (username, email, password) =>
  axios.post(API_URL + 'signup', { username, email, password })
