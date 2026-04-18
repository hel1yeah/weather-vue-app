<template>
  <div v-if="location" class="location">
    <span v-if="location.name" class="location__pill location__pill--primary">
      <span class="location__label">City</span>
      <span class="location__value">{{ location.name }}</span>
    </span>
    <span v-if="location.region" class="location__pill">
      <span class="location__label">Region</span>
      <span class="location__value">{{ location.region }}</span>
    </span>
    <span v-if="location.country" class="location__pill">
      <span class="location__label">Country</span>
      <span class="location__value">{{ location.country }}</span>
    </span>
    <span v-if="location.tz_id" class="location__pill">
      <span class="location__label">TZ</span>
      <span class="location__value">{{ location.tz_id }}</span>
    </span>
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
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 4px;

  &__pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.5px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.9);

    &--primary {
      background: linear-gradient(
        120deg,
        rgba(56, 189, 248, 0.25),
        rgba(168, 85, 247, 0.25)
      );
      border-color: rgba(56, 189, 248, 0.45);
    }
  }

  &__label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }

  &__value {
    color: $white;
  }

  @include wide-850 {
    gap: 6px;

    &__pill {
      padding: 4px 8px;
      font-size: 12px;
      gap: 5px;
    }

    &__label {
      font-size: 9px;
      letter-spacing: 1px;
    }
  }
}
</style>
