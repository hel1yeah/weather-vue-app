import axios from '@/api/axios'

const SEARCH = 'forecast.json'
const API_KEY = process.env.API_KEY

const getFutureWeatherApi = (city) => {
  return axios.get(`${SEARCH}?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`)
}

export { getFutureWeatherApi }
