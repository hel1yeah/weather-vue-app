import axios from '@/api/axios'

const SEARCH = 'search.json'
const API_KEY = process.env.API_KEY

const getCitysAxios = (city) => {
  return axios.get(`${SEARCH}?key=${API_KEY}&q=${city}`)
}

export { getCitysAxios }
