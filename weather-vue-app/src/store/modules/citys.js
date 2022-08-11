import { getCitysAxios } from './../../api/citysListApi'
import { RESPONSE_STATUS, REWSPONSE_NOT_CITY } from './../../common/constants'

const state = {
  cityList: [],
  error: null,
  loader: false,
}
const mutations = {
  SET_CITY_LIST_START(state) {
    state.cityList = null
    state.error = null
    state.loader = true
  },
  SET_CITY_LIST_SUCCESS(state, payload) {
    state.cityList = payload
    state.error = null
    state.loader = false
  },
  SET_CITY_LIST_FAILURE(state, payload) {
    state.cityList = null
    state.error = payload
    state.loader = true
  },
  CLEAR_CITY_LIST(state) {
    state.cityList = null
    state.error = null
    state.loader = false
  },
}

const actions = {
  async getCityList({ commit }, partText) {
    commit('SET_CITY_LIST_START')
    try {
      const response = await getCitysAxios(partText)
      if (
        response.status === RESPONSE_STATUS[200] &&
        response.data.length > 0
      ) {
        setTimeout(() => {
          commit('SET_CITY_LIST_SUCCESS', response.data)
        }, 600)
      } else {
        commit('SET_CITY_LIST_FAILURE', REWSPONSE_NOT_CITY)
      }
    } catch (error) {
      commit('SET_CITY_LIST_FAILURE', error)
    }
  },
  clearSearchCityList({ commit }) {
    commit('CLEAR_CITY_LIST')
  },
}

const getters = {
  isStoreCityList: (state) => state.cityList,
  isLoader: (state) => state.loader,
}

export default { state, mutations, actions, getters, namespaced: true }
