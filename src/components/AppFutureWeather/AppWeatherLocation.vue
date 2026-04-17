<template>
  <div v-if="location" class="location">
    <span v-if="location.name">City: {{ location.name }}</span>
    <span v-if="location.region">Region: {{ location.region }}</span>
    <span v-if="location.country">Country: {{ location.country }}</span>
    <span v-if="location.tz_id">Timezone: {{ location.tz_id }}</span>
  </div>
</template>

<script setup>
defineProps({
  location: { type: Object, default: null },
});
</script>

<style lang="scss" scoped>
.location {
  color: $white;
  display: flex;
  gap: 12px;
  font-size: 16px;
  flex-wrap: wrap;
  font-weight: 500;
}
</style>
