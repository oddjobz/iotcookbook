<template>
  <div id="app">
    <div v-show="!get_isLoggedIn">
      <div v-show="!isLoading">
        <login></login>
      </div>
      <div v-show="isLoading">
        <b-notification :closable="false" class="ui-busy">
          <div class="ui-loading">
            Loading Demo UI
          </div>
          <b-loading :is-full-page="get_isFullPage" :active.sync="isLoading" :canCancel="true"></b-loading>
        </b-notification>
      </div>
    </div>
    <div class="columns" v-show="get_isLoggedIn">
      <div class="column sidebar">
        <sidebar></sidebar>
      </div>
      <div class="column main">
        <navbar></navbar>
        <events></events>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'get_isLoading', 'get_isLoggedIn', 'get_isFullPage'
    ]),
    isLoading: {
        get: function () { return self.get_isLoading },
        set: function (state) { self.set_isLoading(state) }
    }
  },
  name: 'app',
  components: {
    Login: require('./components/Login.vue').default,
    Navbar: require('./components/Navbar.vue').default,
    Sidebar: require('./components/Sidebar.vue').default,
    Events: require('./components/Events.vue').default
  },
  methods: {
      ...mapActions([
        'set_isLoading', 'set_isLoggedIn'
    ])
  },
  created () {
    let self = this
    setTimeout(function () {
      self.set_isLoading(false)
      self.set_isLoggedIn(true)
    }, 2000)
  }
}
</script>

<style lang="sass">
@import '../node_modules/bulma/bulma.sass';

.main-pane
  margin-left: 232px;

.ui-busy
    justify-content: center;
    align-items: center;
    display: flex;
    width: 100%;
    height: 100vh;

.ui-loading
  border-radius: 12px;
  padding: 6px 12px 6px 12px;
  margin-top: 200px;
  color:  #fbda01;
  font-weight: bold;
  background-color: black;

</style>
