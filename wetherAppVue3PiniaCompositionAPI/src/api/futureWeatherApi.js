import axios from '@/api/axios'

const SEARCH = 'forecast.json'
const API_KEY = '074f539ac6aa4b398aa194903222507'

const getFutureWeatherApi = (city) => {
	return axios.get(`${SEARCH}?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`)
}

export { getFutureWeatherApi }