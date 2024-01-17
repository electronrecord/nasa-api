import Vuex from 'vuex';
// import { createLocalVue } from '@vue/test-utils';
import { state, mutations, actions, getters } from '@/store/modules/projects';

// const localVue = createLocalVue();
// localVue.use(Vuex);

describe('Projects Vuex Module', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        projects: {
          state: { ...state }, // Make sure to clone the state to avoid shared state between tests
          mutations: { ...mutations },
          actions: { ...actions },
          getters: { ...getters },
        },
      },
    });
  });

  it('should set state correctly with SET_STATE mutation', () => {
    const key = 'projects';
    const value = [{ projectId: 1, projectName: 'Project 1' }];

    store.commit('SET_STATE', { key, value });

    expect(store.state.projects.projects).toEqual(value);
  });

  it('should set request state correctly with SET_REQ_STATE mutation', () => {
    const value = 'fetching';

    store.commit('SET_REQ_STATE', value);

    expect(store.state.projects.requestState).toBe(value);
  });

  it('should set items per page correctly with SET_ITEMS_PER_PAGE mutation', () => {
    const value = 20;

    store.commit('SET_ITEMS_PER_PAGE', value);

    expect(store.state.projects.pagination.itemsPerPage).toBe(value);
  });

  it('should set page correctly with SET_PAGE mutation', () => {
    const action = 'next';

    store.commit('SET_PAGE', { action });

    expect(store.state.projects.pagination.page).toBe(2);
  });
});
