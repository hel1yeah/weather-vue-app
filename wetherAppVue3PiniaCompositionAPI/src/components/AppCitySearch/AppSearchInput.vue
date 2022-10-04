<template>
  <input
     class="search-input"
     type="text"
     ref="focusInput"
     :value="name"
     @input="updateCityName($event.target.value)"
     @keydown.enter="updateCityName($event.target.value)"
  />
</template>

<script setup>
import {defineProps, onMounted, ref} from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: 'name',
    required: false,
  },
});

const focusInput = ref(null)

onMounted(() => focusInput.value.focus())

const emits = defineEmits(['update:name']);

const updateCityName = (val) => {
  emits('update:name', val);
};
</script>

<style lang="scss">
.search-input {
  padding: 0px 10px;
  width: 100%;
  height: 30px;
}
</style>
