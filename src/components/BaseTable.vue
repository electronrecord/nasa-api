<template>
  <div>
    <table class="base-table"
           :cy="cy || 'data-table'">
      <thead>
      <tr>
        <th :class="key"
            v-for="({name, key}, index) in header"
            :key="index">
          {{ name }}
        </th>
      </tr>
      </thead>

      <tbody v-if="reqState === 'idle'">
        <tr class="pointer"
            v-for="(item, index) in data"
            :key="index">
          <td :class="{[key]: true, flex: key === 'title'}"
              v-for="({key}, idx) in header"
              :key="index"
              @click="selectItem(item)">
            <span v-show="key === 'title'"
                  class="inline-block">{{ (index + 1) + (+page - 1) * +itemsPerPage }}.&nbsp;</span>
            <span class="inline-block">{{ item[key] }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="reqState === 'fetching'"
         cy="fetching">
      <BaseLoader/>
    </div>

    <div v-if="reqState === 'error'"
         cy="fetching-error">
      ERROR FETCHING
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    cy: String,
    reqState: String,
    page: [String, Number],
    itemsPerPage: [String, Number],
    header: Array,
    data: Array
  })
  const emits = defineEmits(['select'])

  function selectItem (item) {
    emits('select', item)
  }
</script>

<style lang="scss">
  .base-table {
    @media only screen and (min-width: 0) {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      padding: 0 8px;
      thead {
        th {
          padding: 0 8px 4px;
          text-align: left;
          border-bottom: 1px solid lightgray;
        }
      }
      tbody {
        td {
          padding: 8px;
          line-height: 1.4;
        }
      }
    }

    @media only screen and (min-width: 1025px) {
      tbody {
        tr.pointer:hover {
          background-color: rgba(0, 0, 0, 0.03);
        }
      }
    }
  }
</style>