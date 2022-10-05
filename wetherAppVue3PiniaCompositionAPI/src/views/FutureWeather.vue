<template>
  <div class="future-weather" v-if="!isLoadedWeather">
    <AppWeatherLocation :country="storeFutureWeather.weatherLocation" />
    <AppFutureDaysWeather :forecast="storeFutureWeather.weatherForecast" />
  </div>
  <AppLoader v-if="storeFutureWeather.loader" />
</template>

<script setup>
// === components ===
import AppWeatherLocation from '@/components/AppFutureWeather/AppWeatherLocation.vue';
import AppFutureDaysWeather from '@/components/AppFutureWeather/AppFutureDaysWeather.vue';
import AppLoader from '@/components/common/AppLoader.vue';
// === vue imports ===
import {computed, nextTick} from 'vue';
import { useFutureWeatherApi } from '@/stores/futureWeather.js';
// === other utilites ===
import isEmpty from 'lodash/isEmpty';
const storeFutureWeather = useFutureWeatherApi();

const isLoadedWeather = computed(() => {
  return isEmpty(storeFutureWeather?.weatherLocation) && isEmpty(storeFutureWeather?.weatherForecast)
})

</script>

<style lang="scss">
.future-weather {
  margin-top: 10px;
}
</style>
