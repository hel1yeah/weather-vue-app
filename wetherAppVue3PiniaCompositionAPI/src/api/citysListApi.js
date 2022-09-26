import axios from '@/api/axios'

const SEARCH = 'search.json'
const API_KEY = '074f539ac6aa4b398aa194903222507'

const getCitysAxios = (city) => {
	return axios.get(`${SEARCH}?key=${API_KEY}&q=${city}`)
}

export { getCitysAxios }