<template>
  <div class="days-weather">
    <div class="days">
      <button
        v-for="(day, idx) in days"
        :key="day.date"
        ref="dayRefs"
        type="button"
        class="day"
        :class="{ 'day--active': idx === activeIdx }"
        :aria-pressed="idx === activeIdx"
        :aria-label="`${day.weekday}, high ${day.day.maxtemp_c}° low ${day.day.mintemp_c}°, ${day.day.condition.text}`"
        @click="activeIdx = idx"
      >
        <span class="day__weekday">{{ day.weekday }}</span>
        <img
          class="day__img"
          :src="`https:${day.day.condition.icon}`"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        <div class="day__temp">
          <span>{{ day.day.maxtemp_c }}&deg;</span>
          /
          <span>{{ day.day.mintemp_c }}&deg;</span>
        </div>
      </button>
    </div>
    <AppGraphDay
      class="chart"
      :hours="activeDayHours"
      :date="activeDate"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import VanillaTilt from 'vanilla-tilt';
import AppGraphDay from '@/components/AppFutureWeather/AppGraphDay.vue';

const props = defineProps({
  forecast: { type: Array, default: () => [] },
});

const activeIdx = ref(0);
const dayRefs = ref([]);

const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });

const days = computed(() =>
  props.forecast.map((day) => ({
    ...day,
    weekday: weekdayFormatter.format(new Date(day.date)),
  })),
);

const activeDayHours = computed(() => props.forecast[activeIdx.value]?.hour ?? []);
const activeDate = computed(() => props.forecast[activeIdx.value]?.date ?? '');

const TILT_OPTIONS = {
  reverse: true,
  max: 15,
  speed: 400,
  scale: 1.02,
  glare: true,
  reset: true,
  perspective: 1000,
  transition: true,
  'max-glare': 0.5,
  gyroscope: true,
  gyroscopeMinAngleX: -45,
  gyroscopeMaxAngleX: 45,
  gyroscopeMinAngleY: -45,
  gyroscopeMaxAngleY: 45,
};

const destroyTilt = () => {
  dayRefs.value.forEach((el) => el?.vanillaTilt?.destroy());
};

const initTilt = () => {
  destroyTilt();
  const elements = dayRefs.value.filter(Boolean);
  if (elements.length) VanillaTilt.init(elements, TILT_OPTIONS);
};

onMounted(initTilt);
watch(days, async () => {
  await Promise.resolve();
  initTilt();
});
</script>

<style lang="scss" scoped>
.days-weather {
  margin-top: 24px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;

  @include wide-850 {
    margin-top: 16px;
    grid-template-columns: 1fr;
    gap: 14px;
  }
}

.days {
  display: flex;
  flex-direction: column;
  gap: 10px;

  @include wide-850 {
    flex-direction: row;
    gap: 8px;
  }
}

.day {
  cursor: pointer;
  color: $white;
  display: flex;
  flex-direction: column;
  place-items: center;
  gap: 2px;
  position: relative;
  width: 100%;
  max-height: 160px;
  padding: 12px 8px;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.35);
  border-radius: 16px;
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.04)
  );
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
  transition: box-shadow 0.3s, border-color 0.3s, background 0.3s;

  &--active {
    border-color: rgba(56, 189, 248, 0.55);
    background: linear-gradient(
      160deg,
      rgba(56, 189, 248, 0.18),
      rgba(168, 85, 247, 0.1)
    );
    box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.3),
      0 12px 30px rgba(56, 189, 248, 0.35);
  }

  &__weekday {
    font-weight: 500;
    letter-spacing: 0.5px;
  }
  &__img {
    scale: 1.1;
  }
  &__temp {
    display: flex;
    gap: 5px;
    font-weight: 300;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
  }

  @include wide-850 {
    padding: 8px 4px 6px;
    gap: 0;
    max-height: none;
    border-radius: 12px;

    &__weekday {
      font-size: 13px;
    }
    &__img {
      scale: 0.85;
      margin: -4px 0;
    }
    &__temp {
      font-size: 12px;
      gap: 3px;
    }
  }
}

.chart {
  display: grid;
  place-items: center;
}

button.day {
  font: inherit;
  text-align: inherit;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  appearance: none;

  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }
}
</style>
