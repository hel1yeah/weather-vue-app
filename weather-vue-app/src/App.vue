<template>
  <div id="app">
    <CitysSearch />
    <FutureWeather />
  </div>
</template>

<script>
import CitysSearch from './../src/views/CitysSearch'
import FutureWeather from '@/views/FutureWeather'

export default {
  components: { FutureWeather, CitysSearch },
  data() {
    return {
      test1: 'test1',
    }
  },
  mounted() {},
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
#app {
}
</style>
