<template>
  <h1>myChart</h1>
  {{ data }}
  <canvas
    ref="ctx"
    id="myChart"
    width="400"
    height="400"
    aria-label="You do not support canvas technologies, I am sorry."
    role="img"
  ></canvas>
</template>

<script setup>
import Chart from 'chart.js/auto';
import { nextTick, ref, onUpdated } from 'vue';

const props = defineProps({
  times: {
    type: Array,
    required: true,
    default: () => [],
  },
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const ctx = ref(null);

nextTick(() => {
  const myChart = new Chart(ctx.value, {
    type: 'line',
    data: {
      labels: props.times,
      datasets: [
        {
          label: 'label temparatures day',
          data: props.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1.4,
          tension: 0.5,
        },

      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

onUpdated(() => {
 // myChart.reset();
})
</script>

<style scoped></style>
