// import Vue from 'vue'
// import _ from 'lodash'

const state = {
    logrealm: ''
}
const getters = {
    get_logrealm: state => state.logrealm
}
const actions = {
    set_logrealm ({commit}, data) { commit('set_logrealm', data) }
}
const mutations = {
    set_logrealm (state, data) { state.logrealm = data }
}
export default {
  state,
  getters,
  actions,
  mutations
}
