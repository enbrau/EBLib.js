/**
 * Wrapped WebSocket
 * @returns Wrapped WebSocket
 */
function WS(opts) {
  this.webSocket = null

  this.open = function(opts) {
    if (!opts.url) {
      return
    }

    // Handle URL
    let url = opts.url
    if (url.startsWith('http://')) {
      url.replace('http',  'ws')
    } else if (url.startsWith('https://')) {
      url.replace('https', 'wss')
    } else if (!url.startsWith('ws')) {
      const schema = opts.schema || 'ws://'
      url = schema + url
    }

    // Create Connection
    try {
      this.webSocket = new WebSocket(url)
      this.bind(opts)
      this.keepAlive(opts)
    } catch (e) {
      console.error(e)
    }
  }

  this.bind = function(opts) {
    if (!this.webSocket) {
      return
    }

    if (opts.onmessage) {
      this.webSocket.onmessage = opts.onmessage
    }

    if (opts.onclose) {
      this.webSocket.onclose = opts.onclose
    }

    if (opts.onerror) {
      this.webSocket.onerror = opts.onerror
    }
  }

  const queue = []
  this.send = function(msg) {
    if (!this.webSocket) {
      return
    }

    if (this.webSocket.readyState != WebSocket.OPEN) {
      queue.push(msg)
      return
    }

    while (queue.length > 0) {
      const qmsg = queue.shift()
      this.webSocket.send(qmsg)
    }
    this.webSocket.send(msg)
  }

  // TODO


  this.timeout = 20000
  this.timerID = 0

  this.keepAlive = function(opts) {
    this.timeout = opts && opts.timeout ? opts.timeout : this.timeout
    if (this.webSocket && this.webSocket.readyState == WebSocket.OPEN) {
      this.webSocket.send('')
    }
    this.timerID = setTimeout(this.keepAlive, this.timeout)
  }

  this.cancelKeepAlive = function() {
    if (this.timerID) {
      clearTimeout(this.timerID)
    }
  }

  this.open(opts)

  return this
}
