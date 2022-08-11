<template>
  <div class="citys-search">
    <AppSearchInput v-bind:cityName.sync="cityName" />
    <AppCityList
      :cityList="isStoreCityList"
      :showCityList="showCityList"
      @getFutureWeather="getFutureWeather"
    />
    <AppLoader :class="[showLoader]" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'

import AppSearchInput from '@/components/AppCitySearch/AppSearchInput'
import AppCityList from '@/components/AppCitySearch/AppCityList'
import AppLoader from '@/components/common/AppLoader'

export default {
  name: 'CitysSearch',
  components: {
    AppLoader,
    AppSearchInput,
    AppCityList,
  },
  data() {
    return {
      cityName: '',
    }
  },
  watch: {
    cityName: {
      handler() {
        if (this.cityName.length >= 3) {
          this.getSearchCityList()
        } else {
          this.clearSearchCityList()
        }
      },
    },
  },
  methods: {
    getSearchCityList() {
      debounce(() => {
        this.$store.dispatch('citys/getCityList', this.cityName)
      }, 600)()
    },
    clearSearchCityList() {
      this.$store.dispatch('citys/clearSearchCityList')
    },
    getFutureWeather(city) {
      this.clearSearchCityList()
      this.$store.dispatch('futureWeather/getFutureWeather', city)
    },
  },
  computed: {
    ...mapGetters('citys', ['isStoreCityList', 'isLoader']),
    showCityList() {
      return this.isStoreCityList !== null && this.isStoreCityList.length >= 1
    },
    showLoader() {
      return {
        show: this.isLoader,
      }
    },
  },
}
</script>

<style lang="scss">
.citys-search {
  position: relative;
  margin: 0 auto 20px;
  padding: 20px 0 0 0;
  max-width: 500px;
  & .loader {
    position: absolute;
    right: -35px;
    top: 20px;
    opacity: 0;
    transition: opacity 0.1s linear;
    &.show {
      opacity: 1;
    }
  }
}
</style>
