<template>
  <div class="future-weather">
    <AppWeatherLocation
      v-if="!isGetWeatherLocation"
      :city="getWeatherLocation.name"
      :region="getWeatherLocation.region"
      :country="getWeatherLocation.country"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppWeatherLocation from '@/components/AppFutureWeather/AppWeatherLocation'
import { isNull } from 'lodash'

export default {
  name: 'futureWeather',
  components: { AppWeatherLocation },
  computed: {
    ...mapGetters('futureWeather', ['getWeatherDays', 'getWeatherLocation']),
    isGetWeatherLocation() {
      return isNull(this.getWeatherLocation)
    },
  },
}
</script>

<style scoped></style>
