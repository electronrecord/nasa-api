<template>
  <label class="base-selector"
         :for="id || name"
         :cy="cy || 'base-select'">
    <span class="inline-block m-r-8">{{ label }}:</span>
    <select @change="handleChange"
            class="pointer"
            :id="id || name">
      <option :value="item"
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
    id: String,
    name: String,
    label: String,
    value: String,
    options: {
      type: Array,
      default: []
    }
  })
  const emits = defineEmits(['change'])
  // const model = ref(props.value)

  function handleChange ({target: {value}}) {
    emits('change', {name: props.name, value})
  }
</script>

<style lang="scss">
  .base-selector {
    @media only screen and (min-width: 0) {
      select {
        padding: 2px 4px;
        border: 1px solid lightgray;
        border-radius: 4px;
      }
    }
  }
</style>