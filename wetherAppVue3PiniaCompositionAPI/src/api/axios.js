import axios from 'axios'

const BASE_URL = 'http://api.weatherapi.com/v1'

axios.defaults.baseURL = `${BASE_URL}/`
axios.defaults.params

export default axios
