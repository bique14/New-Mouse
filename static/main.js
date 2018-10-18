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