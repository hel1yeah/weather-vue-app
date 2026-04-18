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
  top: 44px;
  left: 0;
  width: 100%;
  z-index: 500;
  padding: 6px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(15, 17, 28, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition: opacity 0.25s ease;

  &__item {
    padding: 9px 12px;
    font-size: 14px;
    letter-spacing: 0.5px;
    color: rgba(255, 255, 255, 0.85);
    border-radius: 8px;
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;

    &:hover,
    &--active {
      background: linear-gradient(
        90deg,
        rgba(56, 189, 248, 0.22),
        rgba(168, 85, 247, 0.22)
      );
      color: $white;
      cursor: pointer;
      transform: translateX(2px);
    }
  }
}
</style>
