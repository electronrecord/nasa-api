<template>
  <main class="projects-page">
    <h1 class="text-center">Projects</h1>

    <div class="flex">
      <Datepicker
          cy="updated-since-datepicker"
          @update:model-value="handleUpdatedSince($event)"
          placeholder="date"
          :enable-time-picker="false"
          :model-value="defaultUpdatedSince"
      />
      <BaseSelect label="items per page"
                  :options="itemsPerPageOptions"
                  @change="handleItemsPerPage" />
    </div>

    <span v-if="reqState === 'fetching'"
          cy="fetching">FETCHING ...</span>
    <span v-else-if="reqState === 'error'"
          cy="fetching-error">
      ERROR FETCHING DATA
    </span>
    <div v-else class="data-table">
      <BaseTable :header="tableHeader"
                 :data="projects" />
    </div>

    <MobileFooter />
  </main>
</template>

<script setup>
  import {useStore} from "vuex";
  import {computed} from "vue";
  import MobileFooter from "@/components/MobileFooter.vue";
  import BaseTable from "@/components/BaseTable.vue";
  import { formatDate, itemsPerPageOptions } from '@/store/data'

  const { state, dispatch, getters, commit } = useStore()
  dispatch('get_projects')

  const projects = computed(() => getters.projects)
  const reqState = computed(() => state.projects.requestState)
  const defaultUpdatedSince = computed(() => state.projects.updatedSince)
  const tableHeader = [
    {name: 'name', key: 'title'},
    {name: 'start', key: 'startDateString'},
    {name: 'end', key: 'endDateString'},
  ]

  function handleUpdatedSince (date) {
    commit('SET_STATE', {key: 'updatedSince', value: formatDate(date)})
    dispatch('get_projects')
  }

  function handleItemsPerPage ({value}) {
    commit('SET_ITEMS_PER_PAGE', value)
    // the following condition is to avoid re-requesting the projects if they are already fetched
    if (+value > projects.value.length) {
      dispatch('fetch_projects_by_id')
    }
  }
</script>

<style lang="scss">
  .projects-page {
    @media only screen and (min-width: 0) {
      max-width: 760px;
      margin: 0 auto;
    }
  }
</style>
