<template>
  <div class="main-pane" v-show="this.visible" style="padding:20px">
    <h1 class="title is-4" style="margin-bottom:1rem">Event browser</h1>

    <b-table
        :data="eventsTable"
        style="margin-top:14px"
        narrowed
        paginated
        per-page="20"
        striped>
        <template slot-scope="props">
        <b-table-column field="timestamp" label="TimeStamp" sortable>
            {{ props.row.timestamp.toLocaleString() }}
        </b-table-column>
        <b-table-column field="topic" label="Topic" sortable>
            {{ props.row.topic }}
        </b-table-column>
        <b-table-column field="authid" label="Authid" sortable>
            {{ props.row.authid }}
        </b-table-column>
        <b-table-column field="role" label="Role" sortable>
            {{ props.row.role }}
        </b-table-column>
        <b-table-column field="message" label="Message" sortable>
            {{ props.row.message }}
        </b-table-column>
        </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
        'get_isLoggedIn', 'get_isFullPage', 'get_events'
    ]),
    visible () { return true },
    eventsTable () { return this.get_events },
  },
  components: {
  },
  methods: {
      ...mapActions([
        'set_isLoading', 'set_isLoggedIn'
    ])
  },
  created () {
  }
}
</script>

<style>
</style>
