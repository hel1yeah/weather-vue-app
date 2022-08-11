<template>
  <div class="future-weather"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'futureWeather',
  computed: {
    ...mapGetters('futureWeather', ['getWeatherDays']),
  },
}
</script>

<style scoped></style>
