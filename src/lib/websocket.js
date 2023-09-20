/**
 * Wrapped WebSocket
 * @returns Wrapped WebSocket
 */
function WS() {
  this.webSocket = null
  // TODO


  this.timeout = 20000
  this.timerID = 0

  this.keepAlive = function() {
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

  return this
}
