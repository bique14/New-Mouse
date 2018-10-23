var socket = io.connect()

window.addEventListener("touchmove", (e) => {
  const { clientX, clientY } = e.touches[0]
  socket.emit('move', {
    clientX,
    clientY,
    innerWidth,
    innerHeight,
  })
})

window.addEventListener("click", () => {
  socket.emit('click', {})
})

// TODO add service worker code here
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function () {
      console.log('Service Worker Registered')
    })
}