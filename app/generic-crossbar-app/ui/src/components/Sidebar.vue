<template>
  <div>
    <div class="sidebar-title">
      <img src="crossbar.svg" class="xbr-logo"/>
      <span style="cursor:pointer" v-on:click.stop="SwitchPane('welcome')">Crossbar Demo</span>
    </div>
    <div class="sidebar-panel server-details">
        Please put some detail in this really useful box.
    </div>
    <p><center>Server {{ this.get_logrealm ? "ONLINE" : "OFFLINE" }}&nbsp;&nbsp;</center></p><br/>
    <aside class="menu">
      <p class="menu-label">
        Section # 1
      </p>
      <ul class="menu-list">
        <li :class="isEnabled"><a v-on:click.stop="SwitchPane('pane1')"><b-icon icon="th-large"/>&nbsp;&nbsp;Menu Item #1<span class="pool-ball">{{ 1 }}</span></a></li>
        <li :class="isEnabled"><a v-on:click.stop="SwitchPane('pane2')"><b-icon icon="th-large"/>&nbsp;&nbsp;Menu Item #2<span class="pool-ball">{{ 1 }}</span></a></li>
        <li :class="isEnabled"><a v-on:click.stop="SwitchPane('pane3')"><b-icon icon="th-large"/>&nbsp;&nbsp;Menu Item #3<span class="pool-ball">{{ 1 }}</span></a></li>        
      </ul>
      <p class="menu-label">
        Section # 2
      </p>
      <ul class="menu-list">
        <li :class="isEnabled"><a v-on:click.stop="SwitchPane('pane4')"><b-icon icon="th-large"/>&nbsp;&nbsp;Menu Item #4<span class="pool-ball">{{ 1 }}</span></a></li>
        <li :class="isEnabled"><a v-on:click.stop="SwitchPane('pane5')"><b-icon icon="th-large"/>&nbsp;&nbsp;Menu Item #5<span class="pool-ball">{{ 1 }}</span></a></li>
        <li :class="isEnabled"><a v-on:click.stop="SwitchPane('pane6')"><b-icon icon="th-large"/>&nbsp;&nbsp;Menu Item #6<span class="pool-ball">{{ 1 }}</span></a></li>        
      </ul>
    </aside>
    <div class="sidebar-footer">
      <div class="sidebar-footer-item">
        <a title="Settings"><b-icon icon="cog" /></a>
      </div>
      <div class="sidebar-footer-item">
        <a title="FullScreen"><b-icon icon="arrows-alt"/></a>
      </div>
      <div class="sidebar-footer-item">
        <a title="Lock"><b-icon icon="eye-slash" /></a>
      </div>
      <div class="sidebar-footer-item">
        <a title="Logout"><b-icon icon="power-off" /></a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
        'get_logrealm'
    ]),
    isEnabled () { return true },
  },
  methods: {
    ...mapActions([
    ]),
    SwitchPane (pane) {
        this.$root.$xbr_interface._log.info(`Switch to pane (${pane})`)
    }
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

<style>
.sidebar {
  position: fixed;
  width: 232px;
  padding: 0px!important;
  margin-top: 0.75rem;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  height: 100%;
  background-color: #4d4d4d;
  color: #fbda01;
  padding-right: 5px!important;
}
.sidebar .xbr-logo {
    height: 22px;
    border-radius: 50%;
    margin-right: 4px;
    position: relative;
    top:4px;
}

.sidebar-title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 14px;
  color: white;
  margin-left: -26px;
}
.sidebar-title .icon {
  color: #fbda01;
}
.menu {
  margin-left: 5px;
}
.menu-list .icon {
  color: #fbda01;
}
.menu-list li a {
  color: #ccc;
}
.menu-label {
  color: #d7c12c!important;
  padding-left: 10px;
  margin-bottom: 0px;
  font-size: 13px;
}
.menu-list li :hover {
  background-color: #888!important;
}
.sidebar-panel {
  margin-top: 16px;
  margin-bottom: 20px;
}
.server-detail-label {
  font-size: 0.75em;
  color: #d7c12c;
  text-transform: uppercase;
}
.server-detail {
  font-size: 0.85em;
  color: white;
  padding-left: 6px;
}
.sidebar-footer {
  bottom: 0;
  position: fixed;
  clear: both;
  display: block;
  width: 232px;
  background-color: #3d3c3c;
}
.sidebar-footer-item {
  padding-top: 7px;
  text-align: center;
  padding-bottom: 4px;
  width: 25%;
  display: block;
  font-size: 17px;
  height: 38px;
  float: left;
  cursor: pointer;
}
.sidebar-footer-item a {
  opacity: 0.60;
  color: #fbda01;
  font-size: 0.95em;
}
.sidebar-footer-item:hover {
  background-color: #888;
  color: #fbda01;
}
.realm-select {
  margin-left: 10px;
  margin-right: 10px;
  padding-bottom: 0px;
  margin-bottom: 4px!important;
  color: black;
}
.realm-select select {
  background-color: #d7c12c;
  color:#4d4d4d!important;
  border-color:#4d4d4d!important;
  font-weight:bold;
}
.realm-select select option {
  color:#4d4d4d;
  font-weight: bold;
}
.realm-select .is-small {
  color: #669900!important;
}
.select:not(.is-multiple):not(.is-loading)::after {
    border-color: #669900;
    right: 1.125em;
    z-index: 4;
}
.server-details {
  border: 1px solid rgb(215,193,44,0.5);
  margin-left:12px;
  margin-right: 12px;
  border-radius: 8px;
  padding: 12px;
  padding-top: 6px;
  padding-bottom: 4px;
}
.is-disabled {
  pointer-events: none;
  opacity: 0.65;
}
.pool-ball {
  text-align: right;
  background-color: #d7c12c;
  color:  #3d3c3c;
  float: right;
  border-radius: 50%;
  padding: 4px;
  font-size: 11px;
  font-weight: bold;
  min-width: 24px;
  text-align: center;
  margin-top:2px;
}
hr {
    background-color: #d7c12c;
    margin-top: 4px;
    opacity: 0.5;
    margin-bottom: 4px;
    margin-left:8px;
    margin-right:8px;
    border-top:1px dashed;
    border-image-width: 0;
    height:0;
}
.subtext {
  position: relative;
  top: -2px;
}
</style>
