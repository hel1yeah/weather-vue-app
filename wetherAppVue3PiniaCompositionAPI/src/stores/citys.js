import { getCitysAxios } from '@/api/citysListApi';
import { RESPONSE_STATUS } from '@/common/constants.js';
import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useCitysStore = defineStore('citys', () => {
  const citys = reactive({});
  const error = ref(null);
  const loader = ref(false);

  async function getCityList(cityName = 'Brovary') {
    citys.value = {};
    error.value = null;
    loader.value = true;
    try {
      const response = await getCitysAxios(cityName);
      if (response.status === RESPONSE_STATUS[200] && response.data.length > 0) {
        setTimeout(() => {
          citys.value = response.data;
          error.value = null;
          loader.value = false;
        }, 600);
      }
    } catch (e) {
      citys.value = {};
      error.value = e;
      loader.value = false;
      console.error(e);
    }
  }

  const clearCityList = () => {
    citys.value = {};
    error.value = null;
    loader.value = false;
  };

  return {
    citys,
    error,
    loader,
    getCityList,
    clearCityList,
  };
});
