var socket = io.connect()

window.addEventListener("touchmove", (e) => {
  const { clientX, clientY } = e.touches[0]
  // console.log(clientX, clientY)
  socket.emit('move', {
    clientX,
    clientY,
    innerWidth,
    innerHeight,
  })
})

// TODO add service worker code here
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function () { 
      console.log('Service Worker Registered')
    })
}