<template>
  <table class="base-table"
         :cy="cy || 'data-table'">
    <thead>
      <tr>
        <th v-for="({name}, index) in header"
            :key="index">
          {{ name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data"
          :key="index">
        <td v-for="({key}, idx) in header"
            :key="index">
          {{ item[key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  const props = defineProps({
    cy: String,
    header: Array,
    data: Array
  })
</script>

<style lang="scss">
  .base-table {
    @media only screen and (min-width: 0) {
      thead {
        th {
          text-align: left;
          border-bottom: 1px solid lightgray;
        }
      }
    }
  }
</style>