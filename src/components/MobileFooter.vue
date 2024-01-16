<template>
  <footer class="mobile-footer">
    <BaseSelect label="items per page"
                cy="select-items-per-page"
                :options="options"
                @change="handleItemsPerPage" />
    <BasePagination :page="page"
                    :total="totalPages"
                    @change="handlePageChange" />
  </footer>
</template>

<script setup>
  import {useStore} from "vuex";
  import {useRouter} from 'vue-router';
  import BasePagination from "@/components/BasePagination.vue";
  import {computed} from "vue";

  const { state, dispatch, commit, getters } = useStore()
  const router = useRouter()
  const options = [10, 25, 50]
  const page = computed(() => state.projects.pagination.page)
  const projects = computed(() => state.projects.projectsWithDetails)
  const totalPages = computed(() => getters.totalPages )
  function handleItemsPerPage ({value}) {
    commit('SET_ITEMS_PER_PAGE', value)
    // the following condition is to avoid re-requesting the projects if they are already fetched
    if (+value > projects.value.length) {
      dispatch('fetch_projects_by_id')
    }
  }

  function handlePageChange ({action}) {
    const clbk = () => {
      router.push({ path: router.currentRoute.value.path, query: { page: page.value } });
    }
    commit('SET_PAGE', {action})
    dispatch('fetch_projects_by_id', clbk)
  }
</script>

<style lang="scss">
  .mobile-footer {

  }
</style>