import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getForecast } from '@/api/weatherApi.js';

export const useForecastStore = defineStore('forecast', () => {
  const forecast = ref([]);
  const location = ref(null);
  const error = ref(null);
  const loading = ref(false);

  async function fetchForecast(city) {
    forecast.value = [];
    location.value = null;
    error.value = null;
    loading.value = true;
    try {
      const { data } = await getForecast(city);
      forecast.value = data?.forecast?.forecastday ?? [];
      location.value = data?.location ?? null;
    } catch (e) {
      error.value = e;
      console.error('fetchForecast failed:', e);
    } finally {
      loading.value = false;
    }
  }

  return { forecast, location, error, loading, fetchForecast };
});
