import axios from '../axios'
import api from './api'
export const state = {
  updatedSince: '2024-01-7',
  projects: [],
  projectsWithDetails: [],
  project: {
    leadOrganization: {
      organizationName: ''
    }
  },
  pagination: {
    page: 1,
    itemsPerPage: 10
  },
  requestState: 'idle'
}
export const mutations = {
  SET_STATE (state, {key, value}) {
    state[key] = value
  },
  SET_REQ_STATE (state, value) {
    state.requestState = value
  },
  SET_ITEMS_PER_PAGE (state, value) {
    state.pagination.itemsPerPage = value
  },
  SET_PAGE (state, {action, page}) {
    if (action === 'next') {
      state.pagination.page += 1
    } else {
      state.pagination.page -= 1
    }
    if (page) {
      state.pagination.page = page
    }
  }
}
export const actions = {
  async get_projects ({state, commit}) {
    try {
      commit('SET_REQ_STATE', 'fetching')
      const url = `${api.projects}?updatedSince=${state.updatedSince}`
      const { data } = await axios.get(url)
      commit('SET_STATE', {key: 'projects', value: data.projects})
      const axiosPromises = []
      data.projects.forEach(({projectId}, index) => {
        if (index < +state.pagination.itemsPerPage) {
          axiosPromises.push(axios.get(`${api.projects}/${projectId}`))
        }
      })
      const responses = await Promise.all(axiosPromises);
      commit('SET_STATE', {key: 'projectsWithDetails', value: responses.map(obj => obj.data.project)})
      commit('SET_REQ_STATE', 'idle')
    } catch (err) {
      commit('SET_REQ_STATE', 'error')
    }
  },
  async get_projects_by_id ({state, commit}, clbk = () => {}) {
    try {
      commit('SET_REQ_STATE', 'fetching')
      const {page, itemsPerPage} = state.pagination
      const axiosPromises = []
      state.projects.forEach(({projectId}, index) => {
        if (index >= (+page - 1) * +itemsPerPage && index < +page * +itemsPerPage) {
          axiosPromises.push(axios.get(`${api.projects}/${projectId}`))
        }
      })
      const responses = await Promise.all(axiosPromises);
      commit('SET_STATE', {key: 'projectsWithDetails', value: responses.map(obj => obj.data.project)})
      commit('SET_REQ_STATE', 'idle')
      clbk()
    } catch (err) {
      commit('SET_REQ_STATE', 'error')
    }
  },
  async get_project_by_id ({state, commit}, id) {
    try {
      commit('SET_STATE', {key: 'project', value: {}})
      commit('SET_REQ_STATE', 'fetching')
      const url = `${api.projects}/${id}`
      const { data } = await axios.get(url)
      commit('SET_STATE', {key: 'project', value: data.project})
      commit('SET_REQ_STATE', 'idle')
    } catch (err) {
      commit('SET_REQ_STATE', 'error')
    }
  }
}

export const getters = {
  projects: (state) => {
    // the following code logic is to avoid re-requesting the projects if they are already fetched
    const results = state.projectsWithDetails.slice()
    if (+state.pagination.itemsPerPage < state.projectsWithDetails.length) {
      return state.projectsWithDetails.slice(0, +state.pagination.itemsPerPage)
    }
    return state.projectsWithDetails
  },
  totalPages: (state) => {
    return Math.ceil(state.projects.length / +state.pagination.itemsPerPage)
  }
}