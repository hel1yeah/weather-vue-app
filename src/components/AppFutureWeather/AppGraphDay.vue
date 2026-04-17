<template>
  <VueApexCharts
    width="100%"
    type="line"
    :options="options"
    :series="series"
    class="graph"
  ></VueApexCharts>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts';
import { ref, watch } from 'vue';

watch(
  () => props.data,
  () => setSeries()
);

watch(
  () => props.rain,
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
  rain: {
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
    {
      data: props.rain,
    },
  ];
}

const options = ref({
  chart: {
    id: 'vuechart-example',
    foreColor: '#ffffff',
    height: '200px',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  stroke: {
    curve: 'smooth',
    colors: ['#0ACEF9', '#8A0067FF'],
    width: 5,
  },
  grid: {
    borderColor: '#92fc7a',
  },

  xaxis: {
    categories: props.times,
  },
  markers: {
    colors: ['#0ACEF9', '#8A0067FF'],
  },
  legend: {
    markers: {
      width: 15,
      height: 15,
      fillColors: ['#0ACEF9', '#8A0067FF'],
    },
  },

  yaxis: [
    {
      title: {
        text: 'Temperature °C',
      },
    },
    {
      opposite: true,
      title: {
        text: 'Chance of rain',
      },
    },
  ],
});

let series = ref([
  {
    name: 'Temperature °C',
    data: props.data,
  },
  {
    name: 'Chance of rain %',
    data: props.rain,
  },
]);
</script>

<style scoped lang="scss">
.graph {
  //padding-top: 20px;
}
</style>
