<template>
  <ul class="city-list" ref="cityListRef">
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
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  citys: {
    type: Object,
    default: () => {},
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const emits = defineEmits(['getWeatherCity', 'update:show']);

const cityListRef = ref(null);

const getWeatherCity = (cityName) => {
  emits('getWeatherCity', cityName);
  emits('update:show', false);
  localStorage.setItem('city', cityName);
};

function loges(e) {
  const ul = e.target.closest('ul')
  console.log('e.target', e.target)
  console.log('e.className', e.target.className)
  console.log('e.classList', e.classList)


}

onMounted(() => {
  window.addEventListener('click', loges);
});
onUnmounted(() => {
  window.removeEventListener('click', loges);
});
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
  background-image: linear-gradient(
          45deg,
          hsl(297deg 100% 61%) 0%,
          hsl(322deg 100% 58%) 5%,
          hsl(348deg 100% 55%) 12%,
          hsl(13deg 100% 52%) 21%,
          hsl(36deg 100% 51%) 31%,
          hsl(55deg 99% 54%) 43%,
          hsl(74deg 98% 56%) 55%,
          hsl(93deg 97% 59%) 67%,
          hsl(126deg 97% 64%) 78%,
          hsl(167deg 98% 71%) 88%,
          hsl(207deg 99% 79%) 96%,
          hsl(247deg 100% 86%) 100%
  );
  &__item {
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
