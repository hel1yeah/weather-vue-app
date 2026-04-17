<template>
  <ul
    id="city-search-listbox"
    class="city-list"
    role="listbox"
    aria-label="City suggestions"
  >
    <li
      v-for="(city, idx) in cities"
      :id="`city-option-${idx}`"
      :key="city.id ?? `${city.name}-${city.lat}-${city.lon}`"
      role="option"
      class="city-list__item"
      :class="{ 'city-list__item--active': idx === activeIndex }"
      :aria-selected="idx === activeIndex"
      @mouseenter="$emit('hover', idx)"
      @click="$emit('select', city.name)"
    >
      {{ formatCity(city) }}
    </li>
  </ul>
</template>

<script setup>
defineProps({
  cities: { type: Array, default: () => [] },
  activeIndex: { type: Number, default: -1 },
});

defineEmits(['select', 'hover']);

const formatCity = (city) =>
  [city.name, city.region, city.country].filter(Boolean).join(', ');
</script>

<style lang="scss" scoped>
.city-list {
  position: absolute;
  top: 32px;
  left: 0;
  transition: opacity 0.4s linear;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  z-index: 500;
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

    &:hover,
    &--active {
      background-color: coral;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
