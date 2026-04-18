<template>
  <div ref="rootRef" class="city-search">
    <div class="city-search__row">
      <AppSearchInput
        v-model="cityName"
        :expanded="isListVisible"
        @navigate="handleNavigate"
        @select-active="handleEnter"
        @close="closeList"
      />
      <button
        v-if="geo.isSupported()"
        type="button"
        class="city-search__locate"
        :class="{ 'city-search__locate--loading': geo.loading.value }"
        :disabled="geo.loading.value"
        :aria-label="geo.loading.value ? 'Detecting location…' : 'Use my location'"
        :title="geo.loading.value ? 'Detecting…' : 'Use my location'"
        @click="locateMe"
      >
        <svg
          class="city-search__locate-icon"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
      </button>
    </div>

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
      v-else-if="geoErrorMessage"
      class="city-search__hint city-search__hint--error"
      role="alert"
    >
      {{ geoErrorMessage }}
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
import { useGeolocation } from '@/composables/useGeolocation.js';

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 500;

const rootRef = ref(null);
const cityName = ref('');
const isListVisible = ref(false);
const activeIndex = ref(-1);
const geoErrorMessage = ref('');

const citiesStore = useCitiesStore();
const forecastStore = useForecastStore();
const { getCity, setCity } = useCityStorage();
const geo = useGeolocation();

const geoErrorText = (err) => {
  if (!err) return '';
  if (err.code === 1) return 'Location access denied. Please type a city manually.';
  if (err.code === 2) return 'Location is unavailable.';
  if (err.code === 3) return 'Location request timed out.';
  return err.message || 'Could not detect location.';
};

const locateMe = async () => {
  geoErrorMessage.value = '';
  const query = await geo.locate();
  if (query) {
    closeList();
    await forecastStore.fetchForecast(query);
    const detectedName = forecastStore.location?.name;
    if (detectedName) {
      cityName.value = detectedName;
      setCity(detectedName);
    }
  } else {
    geoErrorMessage.value = geoErrorText(geo.error.value);
  }
};

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
  } else if (geo.isSupported()) {
    locateMe();
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

.city-search__row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.city-search__locate {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  padding: 0;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover:not(:disabled) {
    background: rgba(56, 189, 248, 0.18);
    border-color: rgba(56, 189, 248, 0.55);
    color: $color-primary;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(56, 189, 248, 0.25);
  }

  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }

  &:disabled {
    cursor: progress;
    opacity: 0.7;
  }

  &--loading .city-search__locate-icon {
    animation: locate-spin 1s linear infinite;
  }
}

@keyframes locate-spin {
  to {
    transform: rotate(360deg);
  }
}

.city-search__hint {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  padding: 10px 12px;
  background: rgba(15, 17, 28, 0.92);
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 13px;
  letter-spacing: 0.5px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 500;

  &--error {
    color: #fca5a5;
    border-color: rgba(248, 113, 113, 0.4);
  }
}
</style>
