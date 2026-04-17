<template>
  <div ref="rootRef" class="city-search">
    <AppSearchInput
      v-model="cityName"
      :expanded="isListVisible"
      @navigate="handleNavigate"
      @select-active="handleEnter"
      @close="closeList"
    />

    <AppSearchList
      v-if="isListVisible && hasResults"
      :cities="citiesStore.cities"
      :active-index="activeIndex"
      @select="handleCitySelect"
      @hover="activeIndex = $event"
    />

    <p
      v-else-if="isListVisible && showNotFound"
      class="city-search__hint"
      role="status"
    >
      No city found. Try a different name.
    </p>

    <p
      v-else-if="citiesStore.error"
      class="city-search__hint city-search__hint--error"
      role="alert"
    >
      Network error. Please try again.
    </p>

    <p
      v-else-if="showMinLengthHint"
      class="city-search__hint"
    >
      Type at least {{ MIN_QUERY_LENGTH }} characters…
    </p>

    <div class="loader-wrap" :class="{ 'loader-wrap_visible': citiesStore.loading }">
      <AppLoader />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import debounce from 'lodash/debounce';
import AppSearchInput from '@/components/AppCitySearch/AppSearchInput.vue';
import AppSearchList from '@/components/AppCitySearch/AppSearchList.vue';
import AppLoader from '@/components/common/AppLoader.vue';
import { useCitiesStore } from '@/stores/cities.js';
import { useForecastStore } from '@/stores/forecast.js';
import { useCityStorage } from '@/composables/useCityStorage.js';

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 500;

const rootRef = ref(null);
const cityName = ref('');
const isListVisible = ref(false);
const activeIndex = ref(-1);

const citiesStore = useCitiesStore();
const forecastStore = useForecastStore();
const { getCity, setCity } = useCityStorage();

const hasResults = computed(() => citiesStore.cities.length > 0);
const showNotFound = computed(
  () =>
    !citiesStore.loading &&
    !citiesStore.error &&
    !hasResults.value &&
    cityName.value.length >= MIN_QUERY_LENGTH,
);
const showMinLengthHint = computed(
  () => cityName.value.length > 0 && cityName.value.length < MIN_QUERY_LENGTH,
);

const fetchCitiesDebounced = debounce((query) => {
  citiesStore.fetchCities(query);
}, DEBOUNCE_MS);

const closeList = () => {
  isListVisible.value = false;
  activeIndex.value = -1;
};

const handleCitySelect = (name) => {
  setCity(name);
  cityName.value = name;
  closeList();
  forecastStore.fetchForecast(name);
};

const handleNavigate = (direction) => {
  if (!hasResults.value) return;
  isListVisible.value = true;
  const len = citiesStore.cities.length;
  if (direction === 'down') {
    activeIndex.value = (activeIndex.value + 1) % len;
  } else {
    activeIndex.value = activeIndex.value <= 0 ? len - 1 : activeIndex.value - 1;
  }
};

const handleEnter = () => {
  if (activeIndex.value >= 0 && citiesStore.cities[activeIndex.value]) {
    handleCitySelect(citiesStore.cities[activeIndex.value].name);
  } else if (cityName.value.trim().length >= MIN_QUERY_LENGTH) {
    handleCitySelect(cityName.value.trim());
  }
};

const handleOutsideClick = (event) => {
  if (rootRef.value && !rootRef.value.contains(event.target)) {
    closeList();
  }
};

watch(cityName, (newVal) => {
  activeIndex.value = -1;
  if (newVal === getCity()) return;
  if (newVal.length >= MIN_QUERY_LENGTH) {
    isListVisible.value = true;
    fetchCitiesDebounced(newVal);
  } else {
    fetchCitiesDebounced.cancel();
    citiesStore.clear();
    isListVisible.value = false;
  }
});

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
  const saved = getCity();
  if (saved) {
    cityName.value = saved;
    forecastStore.fetchForecast(saved);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>

<style lang="scss" scoped>
.city-search {
  width: 100%;
  position: relative;
  margin: 0 auto;

  @include wide-850 {
    margin: 0 auto 0 0;
    max-width: 90%;
  }
}

.loader-wrap {
  position: absolute;
  right: -35px;
  top: 0;
  opacity: 0;
  transition: opacity 0.1s linear;

  &_visible {
    opacity: 1;
  }
}

.city-search__hint {
  position: absolute;
  top: 34px;
  left: 0;
  right: 0;
  padding: 8px 10px;
  background: rgba(20, 20, 25, 0.95);
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  font-size: 13px;
  letter-spacing: 1px;
  z-index: 500;

  &--error {
    color: #ffb4b4;
    border-color: rgba(255, 80, 80, 0.4);
  }
}
</style>
