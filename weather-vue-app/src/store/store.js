import Vue from 'vue'
import Vuex from 'vuex'

import citys from './modules/citys'
import futureWeather from './modules/futureWeather'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    data: null,
    error: null,
  },
  mutations: {
    SET_DATA_START(store) {
      store.data = null
      store.error = null
    },
    SET_DATA_SUCCESS(store, payload) {
      store.data = payload
      store.error = null
    },
    SET_DATA_FAILURE(store, payload) {
      store.data = null
      store.error = payload
    },
  },
  actions: {},
  getters: {},
  modules: {
    citys,
    futureWeather,
  },
})
