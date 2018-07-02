import autobahn from 'autobahn-browser/autobahn.min.js'


class Authentication {
  constructor (log, conn, vue = null) {
    this._log = log
    this._conn = conn
    this._buffered = true
    this._vue = vue
    this._log.info('Autobahn version ..' + autobahn.version)
    this._subscriptions = {}
  }
  disconnect () {
    this._log.debug(`Disconnected from realm (${this._profile.realm})`)
    this.connection.close()
    this.connection = null
    this._session = null
    this._vue.$store.dispatch(this._conn, false)
  }
  connect (profile, success, failure) {
    let self = this
    let connected = false
    let log = this._log
    let vue = this._vue
    self._profile = profile
    self._success = success
    self._failure = failure
    self._session = null

    this._config = {
      realm: profile.realm,
      authid: profile.authid,
      name: profile.authid,
      url: profile.url,
      serializers: [new autobahn.serializer.JSONSerializer()]
    }

    function open (session, details) {
      log.info(`Session open in realm (${details.realm}) for ${details.authid} with id=${session._id}`)
      connected = true
      self.activation_code = ''
      vue.$store.dispatch(self._conn, true)
      self._session = session
      if (self._success) self._success()
    }
    function close (reason, details) {
      setTimeout(function () {
        if (!self._session) {
          vue.$store.dispatch(self._conn, false)
        }
      }, 250)
      if (!connected && self._failure) {
        // failed to open a connection
        log.info(reason)
        log.info(details)
        return self._failure(reason, details)
      }
      switch (reason) {
        case 'lost':
          log.warning('Connection lost - will retry')
          break
        case 'closed':
          log.warning('Connection closed')
          break
        case 'unreachable':
          log.warning('Unable to connect to server')
          // window.vm.$root.$toast.open({
          //   duration: 5000,
          //   message: `Unable to connect to the specified Server!`,
          //   position: 'is-top',
          //   type: 'is-danger'
          // })
          break
        case 'unsupported':
          log.warning('No websocket transport')
          // self._vue.$root.$toast.open({
          //   duration: 5000,
          //   message: `Your profile is broken, please correct it!`,
          //   position: 'is-top',
          //   type: 'is-danger'
          // })
          return
      }
      switch (details.reason) {
        default:
          log.info(details.reason)
      }
      log.info(`Connection terminated - no retry reason ${details.reason} message ${details.message}`)
    }
    this.connection = new autobahn.Connection(self._config)
    this.connection.onopen = open
    this.connection.onclose = close
    this.connection.open()
  }
  call (topic, args, success, failure) {
    try {
      this._log.debug(`Call ${topic}(${args})`)
      if (!args) return this._session.call(topic).then(success, failure)
      return this._session.call(topic, args).then(success, failure)
    } catch (err) {
      this._log.error(`${err} tring to call [${topic}]`)
    }
  }
  unsubscribe (id, success, failure) {
    this._session.unsubscribe(this._subscriptions[id]).then(success, failure)
    delete this._subscriptions[id]
  }
  subscribe (topic, handler, options = {}, success = null, failure = null) {
    let self = this
    let queue = []
    let timer = null

    // let record = function (topic, data) {
    //   if (self._vue) self._vue.$root.$store.dispatch('add_event', { when: new Date(), type: self._config.type, topic: topic, data: data })
    // }

    let wrapper = function (args, kwargs, details) {
      if (!self._buffered) {
        // record(topic, data)
        return handler(args, kwargs, details)
      }
      queue.push([args, kwargs, details])
      if (!timer) {
        timer = setInterval(function () {
          self._log.debug(`${self._buffered} :: Ping: ${topic} :: ${queue.length}`)
          if (self._buffered) return
          for (let event of queue) {
            // record(topic, data)
            handler(...event)
          }
          queue = []
          clearInterval(timer)
        }, 1000)
      }
    }
    try {
      let status = this._session.subscribe(topic, wrapper, options).then(
        function (subscription) {
          self._subscriptions[subscription.id] = subscription
          if (success) success(subscription)
        },
        function (error) { if (failure) failure(error) }
      )
      return status
    } catch (err) {
      self._log.error(`Failed to subscribe to (${topic})`)
      // eslint-disable-next-line no-console
      console.log(err)
      return false
    }
  }
}
export default { Authentication }
