<template>
  <div class="location">
    <h2>City: {{ name }}</h2>
    <span> Region: {{ region }} </span>
    <span> Country: {{ countryp }} </span>
    <span> Country: {{ geo }} </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  country: {
    type: null,
    required: true,
    default: null,
  },
});

const name = computed(() => props.country.name)
const region = computed(() => props.country.region)
const countryp = computed(() => props.country.country)
const geo = computed(() => props.country.tz_id
);
</script>

<style scoped lang="scss">
.location {
  display: flex;
  flex-direction: column;
}
</style>
