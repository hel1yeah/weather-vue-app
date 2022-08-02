<template>
  <input class="search-input" type="text" v-model="searchCity" />
</template>

<script>
export default {
  name: 'AppSearchInput',
  props: {
    cityName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchCity: '',
    }
  },
  watch: {
    searchCity: function () {
      this.$emit('update:cityName', this.searchCity)
    },
  },
}
</script>

<style lang="scss">
.search-input {
  padding: 0px 10px;
  width: 100%;
  height: 30px;
}
</style>
