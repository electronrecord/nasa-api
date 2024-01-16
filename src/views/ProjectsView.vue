<template>
  <main class="projects-page">
    <h1 class="text-center">Projects</h1>

    <div class="sort-filter m-b-24">
      <div class="flex align-center">
        <span class="inline-block m-r-8">updated since:</span>
        <Datepicker
            cy="updated-since-datepicker"
            @update:model-value="handleUpdatedSince($event)"
            placeholder="date"
            :enable-time-picker="false"
            :model-value="defaultUpdatedSince"
        />
      </div>
      <BaseSelect label="items per page"
                  cy="select-items-per-page"
                  :options="itemsPerPageOptions"
                  @change="handleItemsPerPage" />
    </div>

    <div class="data-table m-b-24">
      <BaseTable :header="tableHeader"
                 :reqState="reqState"
                 :data="projects"
                 @select="handleSelectTableItem" />
    </div>

    <div class="flex-center m-t-24">
      <BasePagination :page="page"
                      :total="totalPages"
                      @change="handlePageChange" />
    </div>
  </main>
</template>

<script setup>
  import {useStore} from "vuex";
  import {computed} from "vue";
  import BaseTable from "@/components/BaseTable.vue";
  import { formatDate, itemsPerPageOptions } from '@/store/data'
  import BasePagination from "@/components/BasePagination.vue";
  import {useRouter} from "vue-router";

  const { state, dispatch, getters, commit } = useStore()
  const projectWithDetails = computed(() => state.projects.projectsWithDetails)
  !projectWithDetails.value.length && dispatch('get_projects')
  const router = useRouter()
  const page = computed(() => state.projects.pagination.page)
  const reqState = computed(() => state.projects.requestState)
  const totalPages = computed(() => getters.totalPages )
  const projects = computed(() => getters.projects)
  const defaultUpdatedSince = computed(() => state.projects.updatedSince)
  const tableHeader = [
    {name: 'name', key: 'title'},
    {name: 'start', key: 'startDateString'},
    {name: 'end', key: 'endDateString'},
  ]

  function handleUpdatedSince (date) {
    commit('SET_STATE', {key: 'updatedSince', value: formatDate(date)})
    commit('SET_PAGE', {page: 1})
    router.push({ path: router.currentRoute.value.path, query: { page: undefined } });
    dispatch('get_projects')
  }

  function handleItemsPerPage ({value}) {
    commit('SET_ITEMS_PER_PAGE', value)
    // the following condition is to avoid re-requesting the projects if they are already fetched
    if (+value > projects.value.length) {
      dispatch('get_projects_by_id')
    }
  }

  function handlePageChange ({action}) {
    const clbk = () => {
      router.push({ path: router.currentRoute.value.path, query: { page: page.value } });
    }
    commit('SET_PAGE', {action})
    dispatch('get_projects_by_id', clbk)
  }

  function handleSelectTableItem ({projectId}) {
    router.push(`/project/${projectId}`)
  }
</script>

<style lang="scss">
  .projects-page {
    @media only screen and (min-width: 0) {
      padding: 60px 16px 200px;
      max-width: 760px;
      margin: 0 auto;
      .sort-filter {
        .base-selector {
          display: inline-block;
          margin-top: 16px;
        }
      }
    }

    @media only screen and (min-width: 1024px) {
      .sort-filter {
        display: flex;
        justify-content: space-between;
        .base-selector {
          margin-top: 0;
        }
      }
      .base-table {
        .title {
          padding-right: 24px;
        }
        .startDateString,
        .endDateString {
          width: 100px;
        }
      }
    }
  }
</style>
