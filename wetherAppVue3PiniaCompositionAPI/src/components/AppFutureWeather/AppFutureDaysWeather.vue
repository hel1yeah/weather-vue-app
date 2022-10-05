<template>
  <div class="days">
    <div
      class="day"
      ref="refWithTitle"
      v-for="(item, idx) in days"
      :key="idx"
      @click="setArray(idx)"
    >
      <span class="day__date-sunday">{{ item.sunday_afternoo }}</span>
      <img
        class="day__img"
        :src="`https:${item.day.condition.icon}`"
        :alt="item.day.condition.text"
      />
      <div class="day__temp">
        <span class="day__temp-max">{{ item.day.maxtemp_c }} &deg</span>
        /
        <span class="day__temp-min">{{ item.day.mintemp_c }} &deg</span>
      </div>
    </div>
  </div>
  <AppGraphDay :times="arrTimes" :data="arrData" />
</template>
<script setup>
import VanillaTilt from 'vanilla-tilt';
import { ref, computed, watch, nextTick } from 'vue';
import AppGraphDay from '@/components/AppFutureWeather/AppGraphDay.vue';

const props = defineProps({
  forecast: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const daysSandey = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const days = computed(() => {
  const forecast = props.forecast;

  forecast.forEach((day) => {
    let numSandey = new Date(day.date).getDay();
    day['sunday_afternoo'] = daysSandey[numSandey];
  });

  return forecast;
});

const setArray = (e) => {
  isChar.value = e;
};

const isChar = ref(0);

const arrTimes = computed(() => {
  const forecast = props?.forecast[isChar.value]?.hour;
  if (forecast) {
    const arr = forecast.map((hour) => {
      return hour.time.split(' ').slice(-1).toString();
    });
    return arr;
  }
});

const arrData = computed(() => {
  const forecast = props?.forecast[isChar.value]?.hour;
  if (forecast) {
    const arr = forecast.map((hour) => {
      return hour?.temp_c;
    });
    return arr;
  }
});

const refWithTitle = ref([]);

watch(days, () => {
  nextTick(() => {
    useVanillaTilt(refWithTitle.value);
  });
});

function useVanillaTilt(ref) {
  VanillaTilt.init(ref, {
    reverse: true,
    max: 15,
    speed: 400,
    scale: 1.02,
    glare: true,
    reset: true,
    perspective: 1000,
    transition: true,
    'max-glare': 0.5,
    'glare-prerender': false,
    gyroscope: true,
    gyroscopeMinAngleX: -45,
    gyroscopeMaxAngleX: 45,
    gyroscopeMinAngleY: -45,
    gyroscopeMaxAngleY: 45,
  });
}
</script>
<style lang="scss">
.days {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.day {
  cursor: pointer;
  color: $white;
  display: flex;
  place-items: center;
  flex-direction: column;
  position: relative;
  width: 120px;
  max-height: 150px;
  padding: 10px 5px;
  box-shadow: 15px 15px 40px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
  &__date-sunday {
    font-weight: 500;
  }
  &__img {
    scale: 1.1;
  }
  &__temp {
    font-weight: 300;
    font-size: 14px;
    gap: 5px;
  }
  &__temp-max {
  }
  &__temp-min {
  }
}
</style>

<!--      <div class="day__date">avgtemp_c: {{ item.day.avgtemp_c }}</div>-->
<!--      <div class="day__date">avghumidity: {{ item.day.avghumidity }}</div>-->
<!--      <div class="day__date">condition text: {{ item.day.condition.text }}</div>-->
