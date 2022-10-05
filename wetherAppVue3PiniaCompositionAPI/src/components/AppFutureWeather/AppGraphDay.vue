<template>
  <apexchart width="100%" type="line" :options="options" :series="series" class="graph"></apexchart>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts';
import { ref, watch } from 'vue';

watch(
  () => props.data,
  () => setSeries()
);

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

function setSeries() {
  series.value = [
    {
      data: props.data,
    },
  ];
}

const options = ref({
  chart: {
    id: 'vuechart-example',
    foreColor: '#ffffff',
  },
  stroke: {
    curve: 'smooth',
    colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800']
  },
  fill: {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      colorStops: [
        {
          offset: 40,
          color: '#0ACEF9',
          opacity: 1,
        },
      ],
    },
  },
  xaxis: {
    categories: props.times,
  },
});

let series = ref([
  {
    name: 'series-1',
    data: props.data,
  },
]);
</script>

<style scoped lang="scss">
.graph{
  padding-top: 20px;
}
</style>
