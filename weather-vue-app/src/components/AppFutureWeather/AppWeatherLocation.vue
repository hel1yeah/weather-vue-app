<template>
  <div class="location">
    <p>city: {{ city }}</p>
    <p>region: {{ region }}</p>
    <p>country: {{ country }}</p>
  </div>
</template>

<script>
export default {
  name: 'AppWeatherLocation',
  props: {
    city: {
      type: String,
      required: true,
      validator: () => '',
    },
    region: {
      type: String,
      required: true,
      validator: () => '',
    },
    country: {
      type: String,
      required: true,
      validator: () => '',
    },
  },
  mounted() {
    console.log(this.weatherLocation)
  },
}
</script>

<style scoped></style>
