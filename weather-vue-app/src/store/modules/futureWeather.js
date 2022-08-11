import { getFutureWeatherApi } from './../../api/futureWeatherApi'
import { RESPONSE_STATUS } from './../../common/constants'

const state = {
  weatherDays: [],
  weatherLocation: [],
  error: null,
  loader: false,
}
const mutations = {
  SET_WEATHER_START(state) {
    state.weatherLocation = []
    state.weatherDays = []
    state.error = null
    state.loader = true
  },
  SET_WEATHER_SUCCESS(state, { weatherDays, weatherLocation }) {
    state.weatherDays = weatherDays
    state.weatherLocation = weatherLocation
    state.error = null
    state.loader = false
  },
  SET_WEATHER_FAILURE(state, payload) {
    state.weatherDays = []
    state.weatherLocation = []
    state.error = payload
    state.loader = true
  },
  CLEAR_WEATHER(state) {
    state.weatherDays = []
    state.weatherLocation = []
    state.error = null
    state.loader = false
  },
}

const actions = {
  async getFutureWeather({ commit }, city) {
    commit('SET_WEATHER_START')
    try {
      const response = await getFutureWeatherApi(city)

      if (response?.status === RESPONSE_STATUS[200]) {
        const res = {
          weatherDays: response?.data?.forecast.forecastday,
          weatherLocation: response?.data?.location,
        }
        commit('SET_WEATHER_SUCCESS', res)
      }
    } catch (e) {
      commit('SET_WEATHER_FAILURE', e?.response?.data?.error)
    }
  },
}

const getters = {
  getWeatherDays: (state) => state.weatherDays,
  getWeatherLocation: (state) => state.weatherLocation,
  isLoader: (state) => state.loader,
}

export default { state, mutations, actions, getters, namespaced: true }
