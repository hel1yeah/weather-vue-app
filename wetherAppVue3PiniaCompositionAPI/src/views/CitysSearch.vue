<template>
  <div class="citys-search">
    <AppSearchInput v-model:name="cityName" />
    <AppSearchList
      v-if="showCityList"
      v-model:show="showCityList"
      :citys="storeCitys.citys"
      @getWeatherCity="getWeatherCity"
    />
    <AppLoader :class="showLoader" />
  </div>
</template>

<script setup>
// === components ===
import AppSearchInput from '@/components/AppCitySearch/AppSearchInput.vue';
import AppSearchList from '@/components/AppCitySearch/AppSearchList.vue';
import AppLoader from '@/components/common/AppLoader.vue';
// === vue imports ===
import { ref, watch, computed, onMounted } from 'vue';
import { useCitysStore } from '@/stores/citys.js';
import { useFutureWeatherApi } from '@/stores/futureWeather.js';
// === other utilites ===
import debounce from 'lodash/debounce';

const cityName = ref('');
const showCityList = ref(false);
const isCity = localStorage.getItem('city');

const storeCitys = useCitysStore();
const storeWeather = useFutureWeatherApi();

const getCities = (newV) => {
  if (lengthCityName.value) {
    showCityList.value = true;
    storeCitys.getCityList(newV);
  } else {
    storeCitys.clearCityList();
    showCityList.value = false;
  }
};

const getWeatherCity = (e) => {
  showCityList.value = false;
  storeWeather.getFutureWeather(e);
};

const lengthCityName = computed(() => cityName.value.length >= 3);

const showLoader = computed(() => {
  return {
    show: storeCitys.loader,
  };
});

watch(cityName, (newV, oldV) => {
  if (newV === isCity) return;
  if (oldV === isCity) return;
  debounce(() => {
    getCities(newV);
  }, 600)();
});

const LocalStorageCityName = () => {
  if (isCity) {
    storeWeather.getFutureWeather(isCity);
    cityName.value = isCity;
    showCityList.value = false;
  }
};

onMounted(() => {
  LocalStorageCityName();
});
</script>

<style lang="scss">
.citys-search {
  position: relative;
  margin: 0 auto 0;
  padding: 20px 0 0 0;
  max-width: 500px;
  & .loader {
    position: absolute;
    right: -35px;
    top: 20px;
    opacity: 0;
    transition: opacity 0.1s linear;
    &.show {
      opacity: 1;
    }
  }
}
</style>
