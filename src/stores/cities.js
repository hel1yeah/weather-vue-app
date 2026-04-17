import { ref } from 'vue';
import { defineStore } from 'pinia';
import { searchCities } from '@/api/weatherApi.js';

export const useCitiesStore = defineStore('cities', () => {
  const cities = ref([]);
  const error = ref(null);
  const loading = ref(false);

  async function fetchCities(query) {
    cities.value = [];
    error.value = null;
    loading.value = true;
    try {
      const { data } = await searchCities(query);
      cities.value = Array.isArray(data) ? data : [];
    } catch (e) {
      error.value = e;
      console.error('fetchCities failed:', e);
    } finally {
      loading.value = false;
    }
  }

  function clear() {
    cities.value = [];
    error.value = null;
    loading.value = false;
  }

  return { cities, error, loading, fetchCities, clear };
});
