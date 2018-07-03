// import Vue from 'vue'
// import _ from 'lodash'

const state = {
    logrealm: false,
    isLoading: true,
    isLoggedIn: false,
    isFullPage: false,
    events: []
}
const getters = {
    get_logrealm: state => state.logrealm,
    get_isLoading: state => state.isLoading,
    get_isLoggedIn: state => state.isLoggedIn,
    get_isFullPage: state => state.isFullPage,
    get_events: state => state.events
}
const actions = {
    set_logrealm ({commit}, data) { commit('set_logrealm', data) },
    set_isLoading ({commit}, data) { commit('set_isLoading', data) },
    set_isLoggedIn ({commit}, data) { commit('set_isLoggedIn', data) },
    set_isFullPage ({commit}, data) { commit('set_isFullPage', data) },
    set_events ({commit}, data) { commit('set_events', data) },
    add_events ({commit}, data) { commit('add_events', data) }
}
const mutations = {
    set_logrealm (state, data) { state.logrealm = data },
    set_isLoading (state, data) { state.isLoading = data },
    set_isLoggedIn (state, data) { state.isLoggedIn = data },
    set_isFullPage (state, data) { state.isFullPage = data },
    set_events (state, data) { state.events = data },
    add_events (state, data) { state.events.unshift(data) }
}
export default {
  state,
  getters,
  actions,
  mutations
}
