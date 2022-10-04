<template>
  <div class="days">
    <div class="day" v-for="item in days" :key="item">
      <div class="day__date">{{ item.sunday_afternoo }}</div>
      <img :src="`https:${item.day.condition.icon}`" :alt="item.day.condition.text" />
      <div class="day__date">maxtemp_c: {{ item.day.maxtemp_c }}</div>
      <div class="day__date">mintemp_c: {{ item.day.mintemp_c }}</div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  forecast: {
    type: Object,
    required: true,
    default: () => {},
  },
});
const daysSandey = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const days = computed(() => {
  const forecast = props.forecast.value;

  forecast.map((day) => {
    let numSandey = new Date(day.date).getDay();
    day['sunday_afternoo'] = daysSandey[numSandey];
  });

  return forecast;
});
</script>
<style lang="scss">
.days {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.day {
  position: relative;
  width: 120px;
  max-height: 150px;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
}

</style>

<!--      <div class="day__date">avgtemp_c: {{ item.day.avgtemp_c }}</div>-->
<!--      <div class="day__date">avghumidity: {{ item.day.avghumidity }}</div>-->
<!--      <div class="day__date">condition text: {{ item.day.condition.text }}</div>-->
