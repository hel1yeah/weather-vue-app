<template>
  <div class="location">
    <span>City: {{ name }},</span>
    <span> Region: {{ region }}, </span>
    <span> Country: {{ countryp }}, </span>
    <span> Country: {{ geo }}, </span>
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
  color: $white;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 500;
}
</style>
