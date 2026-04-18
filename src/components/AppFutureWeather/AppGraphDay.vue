<template>
  <div class="graph-card">
    <header class="graph-card__head">
      <div class="graph-card__legend">
        <span class="graph-card__chip graph-card__chip--temp">
          <span class="graph-card__dot" />
          Temperature
        </span>
        <span class="graph-card__chip graph-card__chip--rain">
          <span class="graph-card__dot" />
          Rain chance
        </span>
      </div>

      <div class="graph-card__stats">
        <div class="graph-card__stat">
          <span class="graph-card__stat-label">High</span>
          <span class="graph-card__stat-value graph-card__stat-value--hot">
            {{ Math.round(maxTemp) }}&deg;
          </span>
        </div>
        <div class="graph-card__stat">
          <span class="graph-card__stat-label">Low</span>
          <span class="graph-card__stat-value graph-card__stat-value--cold">
            {{ Math.round(minTemp) }}&deg;
          </span>
        </div>
        <div class="graph-card__stat">
          <span class="graph-card__stat-label">Peak rain</span>
          <span class="graph-card__stat-value graph-card__stat-value--rain">
            {{ Math.round(peakRain) }}%
          </span>
        </div>
      </div>
    </header>

    <VueApexCharts
      class="graph-card__chart"
      type="line"
      height="300"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
  hours: { type: Array, default: () => [] },
  date: { type: String, default: '' },
});

const TEMP_COLOR = '#38bdf8';
const TEMP_GLOW = '#7dd3fc';
const RAIN_COLOR = '#c084fc';
const GRID = 'rgba(255, 255, 255, 0.06)';
const TEXT = 'rgba(255, 255, 255, 0.7)';
const TEXT_MUTED = 'rgba(255, 255, 255, 0.4)';

const hoursOfDay = computed(() => props.hours.map((_, i) => i));
const temps = computed(() => props.hours.map((h) => Number(h.temp_c)));
const rain = computed(() => props.hours.map((h) => Number(h.chance_of_rain)));
const formatHour = (h) => `${String(h).padStart(2, '0')}:00`;

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
  return new Date().getHours();
});

const minTemp = computed(() =>
  temps.value.length ? Math.min(...temps.value) : 0,
);
const maxTemp = computed(() =>
  temps.value.length ? Math.max(...temps.value) : 40,
);
const peakRain = computed(() =>
  rain.value.length ? Math.max(...rain.value) : 0,
);

const options = computed(() => ({
  chart: {
    id: 'forecast-chart',
    type: 'line',
    background: 'transparent',
    foreColor: TEXT,
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: true, speed: 500, easing: 'easeinout' },
    dropShadow: {
      enabled: true,
      top: 3,
      left: 0,
      blur: 14,
      opacity: 0.45,
      color: TEMP_COLOR,
    },
  },
  theme: { mode: 'dark' },
  colors: [RAIN_COLOR, TEMP_COLOR],
  plotOptions: {
    bar: {
      columnWidth: '55%',
      borderRadius: 4,
      borderRadiusApplication: 'end',
    },
  },
  stroke: {
    curve: 'smooth',
    width: [0, 4],
    lineCap: 'round',
  },
  fill: {
    type: ['gradient', 'gradient'],
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.6,
      opacityFrom: [0.55, 0.8],
      opacityTo: [0, 0],
      stops: [0, 100],
      gradientToColors: [RAIN_COLOR, TEMP_GLOW],
    },
  },
  grid: {
    borderColor: GRID,
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
    padding: { left: 0, right: 0, top: 0, bottom: 0 },
  },
  markers: {
    size: 0,
    strokeWidth: 0,
    hover: { size: 7, sizeOffset: 3 },
  },
  legend: { show: false },
  dataLabels: { enabled: false },
  xaxis: {
    type: 'numeric',
    min: 0,
    max: 23,
    tickAmount: 8,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      rotate: 0,
      rotateAlways: false,
      hideOverlappingLabels: true,
      style: { fontSize: '11px', colors: TEXT_MUTED, fontWeight: 500 },
      formatter: (val) => {
        const h = Math.round(Number(val));
        if (Number.isNaN(h)) return '';
        return h % 3 === 0 ? formatHour(h) : '';
      },
    },
    tooltip: { enabled: false },
    crosshairs: {
      show: true,
      stroke: {
        color: 'rgba(125, 211, 252, 0.35)',
        width: 1,
        dashArray: 0,
      },
    },
  },
  yaxis: [
    {
      seriesName: 'Rain',
      show: false,
      min: 0,
      max: 100,
    },
    {
      seriesName: 'Temperature',
      opposite: false,
      min: Math.floor(minTemp.value - 2),
      max: Math.ceil(maxTemp.value + 2),
      tickAmount: 4,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: { colors: TEXT_MUTED, fontSize: '11px', fontWeight: 500 },
        formatter: (v) => `${Math.round(v)}°`,
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
  annotations: nowLabel.value !== null
    ? {
        xaxis: [
          {
            x: nowLabel.value,
            borderColor: TEMP_GLOW,
            strokeDashArray: 0,
            opacity: 0.55,
            label: {
              text: 'NOW',
              orientation: 'horizontal',
              borderColor: 'transparent',
              offsetY: -4,
              style: {
                background: TEMP_GLOW,
                color: '#0b1020',
                fontSize: '10px',
                fontWeight: 800,
                padding: { left: 8, right: 8, top: 3, bottom: 3 },
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
        chart: { height: 220 },
        plotOptions: { bar: { columnWidth: '65%' } },
        xaxis: {
          tickAmount: 4,
          labels: {
            style: { fontSize: '10px', colors: TEXT_MUTED, fontWeight: 500 },
            formatter: (val) => {
              const h = Math.round(Number(val));
              if (Number.isNaN(h)) return '';
              return h % 6 === 0 ? formatHour(h) : '';
            },
          },
        },
        yaxis: [
          { show: false },
          {
            tickAmount: 3,
            labels: {
              style: { fontSize: '10px', colors: TEXT_MUTED, fontWeight: 500 },
              formatter: (v) => `${Math.round(v)}°`,
            },
          },
        ],
      },
    },
  ],
}));

const series = computed(() => [
  {
    name: 'Chance of rain %',
    type: 'column',
    data: rain.value.map((r, i) => ({ x: hoursOfDay.value[i], y: r })),
  },
  {
    name: 'Temperature °C',
    type: 'area',
    data: temps.value.map((t, i) => ({ x: hoursOfDay.value[i], y: t })),
  },
]);
</script>

<style lang="scss">
.graph-card {
  position: relative;
  width: 100%;
  padding: 16px 14px 8px;
  border-radius: 18px;
  background:
    radial-gradient(
      800px 200px at 20% -20%,
      rgba(56, 189, 248, 0.18),
      transparent 70%
    ),
    radial-gradient(
      600px 200px at 100% 120%,
      rgba(192, 132, 252, 0.15),
      transparent 70%
    ),
    linear-gradient(160deg, rgba(17, 19, 32, 0.85), rgba(10, 12, 22, 0.9));
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 20px 50px rgba(0, 0, 0, 0.35);
  overflow: hidden;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 2px 6px 14px;
    flex-wrap: wrap;
  }

  &__legend {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  &__chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    border-radius: 999px;
    color: rgba(255, 255, 255, 0.85);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);

    &--temp .graph-card__dot {
      background: $color-primary;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.7);
    }

    &--rain .graph-card__dot {
      background: #c084fc;
      box-shadow: 0 0 10px rgba(192, 132, 252, 0.6);
    }
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  &__stats {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 56px;
    padding: 4px 10px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  &__stat-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.45);
  }

  &__stat-value {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.5px;

    &--hot {
      color: #fdba74;
    }

    &--cold {
      color: #7dd3fc;
    }

    &--rain {
      color: #c084fc;
    }
  }

  &__chart {
    width: 100%;
  }

  @include wide-850 {
    padding: 12px 10px 4px;
    border-radius: 14px;

    &__head {
      gap: 8px;
      padding: 0 2px 10px;
    }

    &__legend {
      gap: 6px;
    }

    &__chip {
      padding: 3px 8px;
      font-size: 10px;
      letter-spacing: 0.4px;
    }

    &__stats {
      gap: 6px;
      width: 100%;
      justify-content: space-between;
    }

    &__stat {
      flex: 1;
      min-width: 0;
      align-items: center;
      padding: 4px 6px;
    }

    &__stat-label {
      font-size: 8px;
      letter-spacing: 1px;
    }

    &__stat-value {
      font-size: 14px;
    }
  }
}

.apexcharts-tooltip.apexcharts-theme-dark {
  background: rgba(15, 15, 22, 0.95) !important;
  color: #fff !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.5) !important;
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

.apexcharts-xaxis-annotations text,
.apexcharts-yaxis-annotations text {
  font-weight: 800;
  letter-spacing: 1.5px;
}
</style>
