<template>
  <div class="container center">
    <div class="container__inner block">
      <span class="rainbow"></span>
      <CitysSearch />
      <FutureWeather />
    </div>
  </div>
  <AppFooter />
</template>

<script setup>
import CitysSearch from '@/views/CitysSearch.vue';
import FutureWeather from '@/views/FutureWeather.vue';
import AppFooter from '@/views/AppFooter.vue';
</script>

<style lang="scss">
.container__inner {
  width: 100%;
}

.block {
  position: relative;
  background: linear-gradient(160deg, rgba(26, 29, 46, 0.85), rgba(11, 13, 20, 0.9));
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: $white;
  letter-spacing: 2px;
  padding: 20px 22px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  &:after {
    content: '';
    position: absolute;
    inset: -1px;
    z-index: -1;
    border-radius: 21px;
    background: linear-gradient(135deg, $color-primary, $color-accent 55%, $color-accent-soft);
    opacity: 0.35;
  }

  .rainbow {
    position: absolute;
    inset: -10px;
    filter: blur(28px);
    z-index: -2;
    opacity: 0.25;
    pointer-events: none;

    &:after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, $color-primary, $color-accent 50%, $color-accent-soft);
    }

    @include wide-850 {
      inset: -6px;
    }
  }

  @include wide-850 {
    padding: 12px 10px;
    border-radius: 16px;
    letter-spacing: 1px;
  }
}
</style>
