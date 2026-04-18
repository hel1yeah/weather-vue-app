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
  width: 100%;
  height: 38px;
  padding: 0 14px;
  font: inherit;
  font-size: 14px;
  letter-spacing: 1px;
  color: $white;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 0.5px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.22);
  }

  &:focus {
    border-color: $color-primary;
    background: rgba(56, 189, 248, 0.1);
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }
}
</style>
