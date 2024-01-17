<template>
  <div class="project-view">
    <header class="text-center">
      <span class="f-18">Project ID: {{ id }}</span>
      <h1>{{ project.title }}</h1>
    </header>

    <div>
      <p class="f-18">
        The lead: {{ project.leadOrganization?.organizationName }} <br>
        Supporting organizations: {{ project.supportingOrganizations?.map(o => o.organizationName).join(', ') }} <br>
        Available contact persons and their functions:<br>
        Principal Investigators: {{ project.principalInvestigators?.map(o => o.fullName).join(', ') }}<br>
        Program Managers: {{ project.programManagers?.map(o => o.fullName).join(', ') }}<br>
        Co-Investigators: {{ project.coInvestigators?.map(o => o.fullName).join(', ') }}<br>
      </p>
    </div>

    <div v-if="reqState === 'fetching'">
      <BaseLoader />
    </div>
    <router-link cy="back-btn" to="/projects">Back</router-link>
  </div>
</template>

<script setup>
  import {useRouter} from "vue-router";
  import {useStore} from "vuex";
  import {computed} from "vue";
  import BaseLoader from "@/components/BaseLoader.vue";

  const router = useRouter()
  const { state, dispatch, getters, commit } = useStore()
  const id = router.currentRoute.value.params.id
  const reqState = computed(() => state.projects.requestState)
  const project = computed(() => state.projects.project)
  dispatch('get_project_by_id', id)
  const roles = ['principalInvestigators', 'programManagers', 'projectManagers', 'coInvestigators']


</script>

<style lang="scss">
  .project-view {
    @media only screen and (min-width: 0) {
      padding: 80px 16px 200px;
      max-width: 760px;
      margin: 0 auto;
    }
  }
</style>