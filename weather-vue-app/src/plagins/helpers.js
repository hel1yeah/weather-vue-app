export default {
  install(Vue) {
    Vue.prototype.$apiKey = `?key=${process.env.API_KEY}`
  },
}
