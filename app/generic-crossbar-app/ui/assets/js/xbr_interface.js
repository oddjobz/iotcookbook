import logger from './xbr_logger.js'
import connect from './xbr_connect.js'

class Interface {
  constructor (vue) {
    this._log = new logger.Logger('green')
    this._log_realm = new connect.Authentication(this._log, 'set_logrealm', vue.$root)
    this._vue = vue
    this._profile = {
      realm: "logger",
      authid: "client",
      url: "wss://localhost:8443/ws"
    }
  }
  connect () {
    let self = this
    this._log_realm.connect(this._profile, () => {
      self._log.info('Connected')
      self._log_realm._session.subscribe(
        "",
        function (args, kwargs, details) {
          // eslint-disable-next-line no-console
          console.log(args, kwargs, details)
        },
        {match: 'prefix'}
      )
    })
  }
}
export default { Interface }
            
//   self._log_realm.subscribe("",
//     function (args, kwargs, details) {
//       // eslint-disable-next-line no-console
//       console.log(args, kwargs, details)
//       self._log.info(`Data> ${args} :: ${kwargs} :: ${details}`)
//     },
//     {match: 'prefix', details: true},
//     function () {
//       self._log_realm._buffered = false
//     }
//   )
// })
