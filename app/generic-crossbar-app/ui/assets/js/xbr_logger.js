const DEBUG = 'DEBUG'
const INFO = 'INFO'
const WARNING = 'WARNING'
const ERROR = 'ERROR'

class Logger {
  constructor (color = 'green') {
    this._debug = 'color:gray;font-weight:bold'
    this._info = 'color:green;font-weight:bold'
    this._warning = 'color:orange;font-weight:bold'
    this._error = 'color:red;font-weight:bold'
    this._date = `color:white;background-color:${color}`
    this._where = 'color:teal'
    this._message = 'color:black;font-weight:bold'
    this._fdebug = true
    this._finfo = true
    this._fwarning = true
    this.log('INFO', 'Javascript Colour Console - Crossbar.IO (C) 2018')
  }
  setLevel (level) {
    switch (level.toLowerCase()) {
      case 'debug':
        this._fdebug = this._finfo = this._fwarning = true
        break
      case 'info':
        this._fdebug = false
        this._finfo = this._fwarning = true
        break
      case 'warning':
        this._fdebug = this._finfo = false
        this._fwarning = true
        break
      case 'error':
        this._fdebug = this._finfo = this._fwarning = false
        break
    }
  }
  debug (message) {
    this._fdebug && this.log(DEBUG, message)
  }
  info (message) {
    this._finfo && this.log(INFO, message)
  }
  warning (message) {
    this._fwarning && this.log(WARNING, message)
  }
  error (message) {
    this.log(ERROR, message)
  }
  log (level, message) {
    // eslint-disable-next-line no-console
    let where = ''
    try {
      where = new Error().stack.split('\n')[3].split('(')[1].split(')')[0]
    } catch {
      where = ''
    }
    let colour = ''
    switch (level) {
      case INFO:
        colour = this._info
        break
      case WARNING:
        colour = this._warning
        break
      case ERROR:
        colour = this._error
        break
      default:
        colour = this._debug
        break
    }
    // eslint-disable-next-line no-console
    console.log(`%c ${String(new Date()).slice(0, 25)}%c [${level}] %c${message} %c=> ${where}`,
      this._date, colour, this._message, this._where)
  }
}
export default { Logger }
