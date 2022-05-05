export const state = () => ({
  search: false,
})

export const mutations = {
  SET_SEARCH(state, data) {
    state.search = data
  },
}

export const actions = {
  setSearchActive({ commit }, data) {
    commit('SET_SEARCH', data)
  },
}
