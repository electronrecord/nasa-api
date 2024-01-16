<template>
  <div class="base-pagination flex"
       cy="base-pagination">
    <button :disabled="+page === 1"
            cy="prev-page"
            @click="handlePage('back')" >
      <img src="../assets/arrow-left.svg" alt="arrow left" />
    </button>
    <span cy="page-and-total">{{ page }} / {{ total }}</span>
    <button :disabled="+page === total"
            cy="next-page"
            @click="handlePage('next')">
      <img src="../assets/arrow-right.svg" alt="arrow right" />
    </button>
  </div>
</template>

<script setup>
  const props = defineProps({
    page: [String, Number],
    total: [String, Number]
  })
  const emits = defineEmits(['change'])

  function handlePage (action) {
    emits('change', {action})
  }
</script>

<style lang="scss">
  .base-pagination {
    @media only screen and (min-width: 0) {
      button {
        border: none;
        background-color: white;
      }
    }
  }
</style>