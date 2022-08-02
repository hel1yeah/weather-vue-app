<template>
  <ul :class="['city-list', showCityListClass]">
    <li
      class="city-list__item"
      v-for="city in cityList"
      :key="city.id"
      @click="getWeatherCity(city.name)"
    >
      {{ city.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppCityList',
  props: {
    cityList: {
      type: Array,
      default: () => [],
    },
    showCityList: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getWeatherCity(city) {
      this.$emit('getWeatherCity', city)
    },
  },
  computed: {
    showCityListClass() {
      return {
        show: this.showCityList,
      }
    },
  },
}
</script>

<style lang="scss">
.city-list {
  position: absolute;
  top: 40px;
  left: 0;
  opacity: 0;
  transition: opacity 0.4s linear;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;

  &.show {
    opacity: 1;
  }

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
