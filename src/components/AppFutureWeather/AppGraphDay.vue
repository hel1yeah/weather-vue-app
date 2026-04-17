<template>
  <VueApexCharts
    class="graph"
    type="line"
    height="300"
    :options="options"
    :series="series"
  />
</template>

<script setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
  hours: { type: Array, default: () => [] },
  date: { type: String, default: '' },
});

const TEMP_COLOR = '#0ACEF9';
const RAIN_COLOR = '#ff4ec0';
const GRID = 'rgba(255, 255, 255, 0.08)';
const TEXT = 'rgba(255, 255, 255, 0.75)';

const times = computed(() =>
  props.hours.map((h) => h.time.split(' ').at(-1)),
);
const temps = computed(() => props.hours.map((h) => Number(h.temp_c)));
const rain = computed(() => props.hours.map((h) => Number(h.chance_of_rain)));

const isToday = computed(() => {
  if (!props.date) return false;
  const [y, m, d] = props.date.split('-').map(Number);
  const now = new Date();
  return (
    now.getFullYear() === y &&
    now.getMonth() + 1 === m &&
    now.getDate() === d
  );
});

const nowLabel = computed(() => {
  if (!isToday.value) return null;
  return `${String(new Date().getHours()).padStart(2, '0')}:00`;
});

const minTemp = computed(() =>
  temps.value.length ? Math.min(...temps.value) : 0,
);
const maxTemp = computed(() =>
  temps.value.length ? Math.max(...temps.value) : 40,
);

const options = computed(() => ({
  chart: {
    id: 'forecast-chart',
    type: 'line',
    foreColor: TEXT,
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: true, speed: 400, easing: 'easeout' },
    dropShadow: {
      enabled: true,
      top: 2,
      left: 0,
      blur: 12,
      opacity: 0.35,
      color: TEMP_COLOR,
    },
  },
  theme: { mode: 'dark' },
  colors: [TEMP_COLOR, RAIN_COLOR],
  stroke: { curve: 'smooth', width: [3, 2], dashArray: [0, 4] },
  fill: {
    type: ['gradient', 'solid'],
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.3,
      opacityFrom: 0.55,
      opacityTo: 0,
      stops: [0, 100],
      gradientToColors: [TEMP_COLOR],
    },
  },
  grid: {
    borderColor: GRID,
    strokeDashArray: 3,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
    padding: { left: 10, right: 10, top: -10 },
  },
  markers: {
    size: 0,
    strokeWidth: 0,
    hover: { size: 6 },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    offsetY: -4,
    markers: { width: 10, height: 10, radius: 12 },
    itemMargin: { horizontal: 12 },
    labels: { colors: TEXT },
  },
  xaxis: {
    categories: times.value,
    tickAmount: 8,
    tickPlacement: 'on',
    axisBorder: { show: false },
    axisTicks: { color: GRID },
    labels: {
      rotate: 0,
      rotateAlways: false,
      hideOverlappingLabels: true,
      style: { fontSize: '11px', colors: TEXT },
      formatter: (val) => {
        if (!val) return '';
        const h = Number(String(val).split(':')[0]);
        return h % 3 === 0 ? val : '';
      },
    },
    tooltip: { enabled: false },
    crosshairs: {
      show: true,
      stroke: {
        color: 'rgba(255, 255, 255, 0.25)',
        width: 1,
        dashArray: 3,
      },
    },
  },
  yaxis: [
    {
      seriesName: 'Temperature °C',
      min: Math.floor(minTemp.value - 2),
      max: Math.ceil(maxTemp.value + 2),
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: { colors: TEMP_COLOR, fontSize: '11px' },
        formatter: (v) => `${Math.round(v)}°`,
      },
      title: {
        text: 'Temperature',
        style: { color: TEMP_COLOR, fontSize: '11px', fontWeight: 500 },
      },
    },
    {
      seriesName: 'Chance of rain %',
      opposite: true,
      min: 0,
      max: 100,
      tickAmount: 5,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: { colors: RAIN_COLOR, fontSize: '11px' },
        formatter: (v) => `${Math.round(v)}%`,
      },
      title: {
        text: 'Rain',
        style: { color: RAIN_COLOR, fontSize: '11px', fontWeight: 500 },
      },
    },
  ],
  tooltip: {
    enabled: true,
    shared: true,
    intersect: false,
    followCursor: true,
    theme: 'dark',
    custom: ({ dataPointIndex }) => {
      const h = props.hours[dataPointIndex];
      if (!h) return '';
      const icon = `https:${h.condition.icon}`;
      const time = String(h.time).split(' ').at(-1) ?? '';
      return `
        <div class="chart-tooltip">
          <div class="chart-tooltip__head">
            <img src="${icon}" class="chart-tooltip__icon" alt="" />
            <div>
              <div class="chart-tooltip__time">${time}</div>
              <div class="chart-tooltip__cond">${h.condition.text}</div>
            </div>
          </div>
          <div class="chart-tooltip__row">
            <span class="chart-tooltip__dot" style="background:${TEMP_COLOR}"></span>
            <span>${Math.round(h.temp_c)}°C</span>
            <span class="chart-tooltip__muted">feels ${Math.round(h.feelslike_c)}°</span>
          </div>
          <div class="chart-tooltip__row">
            <span class="chart-tooltip__dot" style="background:${RAIN_COLOR}"></span>
            <span>${Math.round(h.chance_of_rain)}% rain</span>
            <span class="chart-tooltip__muted">${h.humidity}% hum.</span>
          </div>
          <div class="chart-tooltip__row chart-tooltip__row--sub">
            <span>💨 ${Math.round(h.wind_kph)} km/h</span>
            <span>UV ${h.uv ?? '–'}</span>
          </div>
        </div>
      `;
    },
  },
  annotations: nowLabel.value
    ? {
        xaxis: [
          {
            x: nowLabel.value,
            borderColor: '#ffffff',
            strokeDashArray: 4,
            opacity: 0.6,
            label: {
              text: 'NOW',
              orientation: 'horizontal',
              borderColor: '#ffffff',
              style: {
                background: '#ffffff',
                color: '#111',
                fontSize: '10px',
                fontWeight: 700,
                padding: { left: 6, right: 6, top: 2, bottom: 2 },
              },
            },
          },
        ],
      }
    : { xaxis: [] },
  responsive: [
    {
      breakpoint: 600,
      options: {
        chart: { height: 250 },
        legend: { position: 'bottom', horizontalAlign: 'center' },
        xaxis: {
          tickAmount: 4,
          labels: {
            formatter: (val) => {
              if (!val) return '';
              const h = Number(String(val).split(':')[0]);
              return h % 6 === 0 ? val : '';
            },
          },
        },
        yaxis: [
          { labels: { style: { fontSize: '10px' } }, title: { text: '' } },
          { labels: { style: { fontSize: '10px' } }, title: { text: '' } },
        ],
      },
    },
  ],
}));

const series = computed(() => [
  { name: 'Temperature °C', type: 'area', data: temps.value },
  { name: 'Chance of rain %', type: 'line', data: rain.value },
]);
</script>

<style lang="scss">
.graph {
  width: 100%;
}

.apexcharts-tooltip.apexcharts-theme-dark {
  background: rgba(15, 15, 22, 0.95) !important;
  color: #fff !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 10px !important;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45) !important;
  overflow: hidden;
}

.chart-tooltip {
  padding: 10px 12px;
  min-width: 210px;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.5px;

  &__head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__icon {
    width: 40px;
    height: 40px;
  }

  &__time {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }

  &__cond {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.6);
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    padding: 3px 0;

    &--sub {
      margin-top: 6px;
      padding-top: 6px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 11px;
      color: rgba(255, 255, 255, 0.7);
      justify-content: space-between;
    }
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  &__muted {
    color: rgba(255, 255, 255, 0.45);
    margin-left: auto;
    font-size: 11px;
  }
}

.apexcharts-xaxistooltip,
.apexcharts-yaxistooltip {
  background: rgba(15, 15, 22, 0.95) !important;
  color: #fff !important;
  border-color: rgba(255, 255, 255, 0.12) !important;

  &::before,
  &::after {
    border-bottom-color: rgba(15, 15, 22, 0.95) !important;
    border-top-color: rgba(15, 15, 22, 0.95) !important;
  }
}

.apexcharts-legend-text {
  font-size: 12px !important;
  letter-spacing: 1px !important;
}

.apexcharts-xaxis-annotations text,
.apexcharts-yaxis-annotations text {
  font-weight: 700;
  letter-spacing: 1px;
}
</style>
