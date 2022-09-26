<template>
  <ul class="city-list">
    <li
      class="city-list__item"
      v-for="city in citys.value"
      :key="city.id"
      @click="getWeatherCity(city.name)"
    >
      {{ city.name }}
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  citys: {
    type: Object,
    default: () => {},
    required: true,
  },
});

const emits = defineEmits(['getWeatherCity']);

const getWeatherCity = (cityName) => emits('getWeatherCity', cityName);
</script>

<style lang="scss">
.city-list {
  position: absolute;
  top: 60px;
  left: 0;
  transition: opacity 0.4s linear;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  &__item {
    background-color: lightcoral;
    padding: 5px 10px;
    color: whitesmoke;
    transition: background-color 0.3s linear, color 0.4s linear;

    &:hover {
      background-color: coral;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
