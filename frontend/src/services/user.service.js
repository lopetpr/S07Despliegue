import axios from 'axios'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api/test/'

const authHeader = (token) => ({ Authorization: `Bearer ${token}` })

export const getPublicContent  = ()      => axios.get(API_URL + 'all')
export const getUserBoard      = (token) => axios.get(API_URL + 'user',  { headers: authHeader(token) })
export const getModeratorBoard = (token) => axios.get(API_URL + 'mod',   { headers: authHeader(token) })
export const getAdminBoard     = (token) => axios.get(API_URL + 'admin', { headers: authHeader(token) })
