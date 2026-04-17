<template>
  <input
    ref="inputRef"
    class="search-input"
    type="search"
    role="combobox"
    :value="modelValue"
    :placeholder="placeholder"
    :aria-label="placeholder"
    :aria-expanded="expanded"
    aria-autocomplete="list"
    aria-controls="city-search-listbox"
    autocomplete="off"
    spellcheck="false"
    @input="$emit('update:modelValue', $event.target.value)"
    @keydown.down.prevent="$emit('navigate', 'down')"
    @keydown.up.prevent="$emit('navigate', 'up')"
    @keydown.enter.prevent="$emit('select-active')"
    @keydown.escape.prevent="$emit('close')"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue';

defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Start typing a city name…' },
  expanded: { type: Boolean, default: false },
});

defineEmits(['update:modelValue', 'navigate', 'select-active', 'close']);

const inputRef = ref(null);

onMounted(() => inputRef.value?.focus());
</script>

<style lang="scss" scoped>
.search-input {
  padding: 0 10px;
  width: 100%;
  height: 30px;
  border-radius: 5px;
}
</style>
