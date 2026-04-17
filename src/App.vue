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
  background: linear-gradient(45deg, #272325 40%, #020104);
  color: #fff;
  letter-spacing: 4px;
  padding: 40px;
  border-radius: 20px;
  &:after {
    content: '';
    position: absolute;
    top: -12px;
    right: -12px;
    bottom: -12px;
    left: -12px;
    z-index: -1;
    border-radius: 22px;
    background: linear-gradient(45deg, #ff005e, #fbff00);
    animation: neon-block 15s linear infinite;

    @include wide-850 {
      top: -5px;
      right: -5px;
      bottom: -5px;
      left: -5px;
    }
  }
  .rainbow {
    position: absolute;
    top: -14px;
    right: -14px;
    bottom: -14px;
    left: -14px;
    filter: blur(15px);
    z-index: -2;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(315deg, #ff005e, #fbff00);
    }
    &:after {
      animation: neon-block 15s linear infinite;
    }
    @include wide-850 {
      top: -5px;
      right: -5px;
      bottom: -5px;
      left: -5px;
    }
  }
  @include wide-850 {
    padding: 10px;
  }
}
@keyframes neon-block {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
}
</style>
