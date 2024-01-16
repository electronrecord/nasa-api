<template>
  <label class="base-selector"
         :cy="cy || 'base-select'">
    <span>{{ label }}</span>
    <select @change="handleChange">
      <option :value="value"
              v-for="(item, index) in options"
              :key="index">
        {{ item }}
      </option>
    </select>
  </label>
</template>

<script setup>
  const props = defineProps({
    cy: String,
    name: String,
    label: String,
    value: String,
    options: {
      type: Array,
      default: []
    }
  })
  const emits = defineEmits(['change'])

  function handleChange ({target: { value }}) {
    emits('change', {name: props.name, value})
  }
</script>

<style lang="scss">
  .base-selector {
  }
</style>