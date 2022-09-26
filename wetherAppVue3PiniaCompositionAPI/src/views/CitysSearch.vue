<template>
  <div class="citys-search">
    <AppSearchInput v-model:name="cityName"/>
    <AppSearchList :citys="storeCitys.citys" @getWeatherCity="getWeatherCity"/>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useCitysStore } from '@/stores/citys.js';
import AppSearchInput from '@/components/AppCitySearch/AppSearchInput.vue';
import AppSearchList from '@/components/AppCitySearch/AppSearchList.vue';

const storeCitys = useCitysStore();

const cityName = ref(null);

const getCities = (newV) => {
  lengthCityName.value ? storeCitys.getCityList(newV) : storeCitys.clearCityList(newV);
};

const getWeatherCity = (e) => console.log('getWeatherCity', e)

const lengthCityName = computed(() => cityName.value.length >= 3);

watch(cityName, (newV, oldV) => {
  getCities(newV);
});
</script>

<style lang="scss">
.citys-search {
  position: relative;
  margin: 0 auto 20px;
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
