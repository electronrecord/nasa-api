<template>
  <div class="project-view">
    <header class="text-center">
      <span class="f-18">Project ID: {{ id }}</span>
      <h1>{{ project.title }}</h1>
    </header>

    <div v-if="reqState === 'fetching'">
      <BaseLoader />
    </div>
    <div v-else>
      <p>
        <b>The lead:</b> {{ project.leadOrganization?.organizationName }} <br>
        <b>Supporting organizations:</b> {{ project.supportingOrganizations?.map(o => o.organizationName).join(', ') }} <br>
      </p>
      <p>
        <b>Available contact persons and their functions:</b><br>
        &nbsp;&nbsp;Principal Investigators: {{ project.principalInvestigators?.map(o => o.fullName).join(', ') }}<br>
        &nbsp;&nbsp;Program Managers: {{ project.programManagers?.map(o => o.fullName).join(', ') }}<br>
        &nbsp;&nbsp;Program Directors: {{ project.programDirectors?.map(o => o.fullName).join(', ') }}<br>
        &nbsp;&nbsp;Project Managers: {{ project.projectManagers?.map(o => o.fullName).join(', ') }}<br>
        &nbsp;&nbsp;Co-Investigators: {{ project.coInvestigators?.map(o => o.fullName).join(', ') }}<br>
      </p>
    </div>

    <div class="flex-center footer-actions">
      <router-link cy="back-btn"
                   class="flex align-center"
                   to="/projects">
        <img class="m-r-8" src="../assets/arrow-left.svg" alt="arrow left" />
        <span>BACK to projects</span>
      </router-link>
    </div>
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
      h1 {
        font-size: 2.4rem;
      }
      p {
        line-height: 2;
      }
      p, b {
        font-size: 1.8rem;
      }
      .footer-actions {
        margin-top: 48px;
        a {
          text-decoration: none;
          span {
            transition: transform 0.2s ease-in-out;
          }
          &:hover {
            span {
              transform: translateX(-3px);
            }
          }
        }
      }
    }
  }
</style>