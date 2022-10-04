import { getFutureWeatherApi } from '@/api/futureWeatherApi.js';
import { RESPONSE_STATUS } from '@/common/constants.js';
import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';

export const useFutureWeatherApi = defineStore('future-weather', () => {
  const weatherForecast = reactive({});
  const weatherLocation = ref([]);
  const error = ref(null);
  const loader = ref(false);

  async function getFutureWeather(city) {
    weatherForecast.value = [];
    weatherLocation.value = {};
    error.value = null;
    loader.value = true;
    try {
      const response = await getFutureWeatherApi(city);
      if (response?.status === RESPONSE_STATUS[200]) {
        weatherForecast.value = response?.data?.forecast?.forecastday;
        weatherLocation.value = response?.data?.location;
        loader.value = false;
      }
    } catch (e) {
      weatherForecast.value = [];
      weatherLocation.value = {};
      error.value = e;
      // loader.value = true;
    }
  }

  return {
    weatherForecast,
    weatherLocation,
    getFutureWeather,
    error,
    loader,
  }
});
