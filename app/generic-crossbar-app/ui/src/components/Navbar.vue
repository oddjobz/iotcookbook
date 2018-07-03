<template>
    <nav class="navbar is-transparent" aria-label="dropdown navigation">
        <div class="navbar-brand">
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <div class="navbar-item">
                    <div class="field is-grouped">
                    <p class="control">
                        <span class="icon bars">
                        <b-icon icon="bars"/>
                        </span>
                    </p>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
    ]),
  },
  methods: {
    ...mapActions([
    ])
  },
  components: {
  },
  data () {
    return {
        navigation: null
    }
  },
  created () {}
}
</script>
<style lang="sass">
.navbar
  background-color: #eee;
  border-bottom: 1px solid #ccc;
  margin-left: 232px;

.bars
  font-size: 22px;
  padding-top: 8px;
  padding-left: 8px;

.user-avatar
  border-radius: 50%;

.navbar-item.realms
  padding-top: 3px;
  padding-bottom: 3px;

.navbar-item.realms .tab-content
  display: none;

nav.tabs.is-toggle
  margin-bottom: 0;

nav.tabs.is-toggle a
  padding-top: 6px;
  padding-bottom: 6px;

.select_realm select
  background-color: #3d3c3c;
  border-color: #3d3c3c;
  color: #d7c12c!important;

.select_realm select option
  color: #d7c12c!important;

</style>
