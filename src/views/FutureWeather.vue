<template>
  <div
    v-if="forecastStore.loading"
    class="future-weather__status"
    role="status"
    aria-live="polite"
  >
    <AppLoader />
    <span class="future-weather__status-text">Loading forecast…</span>
  </div>

  <p
    v-else-if="forecastStore.error"
    class="future-weather__status future-weather__status--error"
    role="alert"
  >
    Could not load forecast. Please try again.
  </p>

  <div v-else-if="hasData" class="future-weather">
    <AppWeatherLocation :location="forecastStore.location" />
    <AppFutureDaysWeather :forecast="forecastStore.forecast" />
  </div>

  <p v-else class="future-weather__status future-weather__status--muted">
    Search for a city to see the 3-day forecast.
  </p>
</template>

<script setup>
import { computed } from 'vue';
import AppWeatherLocation from '@/components/AppFutureWeather/AppWeatherLocation.vue';
import AppFutureDaysWeather from '@/components/AppFutureWeather/AppFutureDaysWeather.vue';
import AppLoader from '@/components/common/AppLoader.vue';
import { useForecastStore } from '@/stores/forecast.js';

const forecastStore = useForecastStore();

const hasData = computed(
  () => forecastStore.location !== null && forecastStore.forecast.length > 0,
);
</script>

<style lang="scss" scoped>
.future-weather {
  margin-top: 10px;
  display: grid;
  width: 100%;
}

.future-weather__status {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 14px;
  letter-spacing: 1px;

  &--muted {
    opacity: 0.6;
  }

  &--error {
    color: #ffb4b4;
  }
}

.future-weather__status-text {
  font-weight: 400;
}
</style>
