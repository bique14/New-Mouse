var socket = io.connect()
function setStatus(text) {
  document.querySelector("#status").textContent = String(text)
}

window.addEventListener("deviceorientation", function (event) {
  const { alpha, beta, gamma } = event
  // setStatus(`alpha=${alpha} beta=${beta} gamma=${gamma}`)
  socket.emit('sensor', {
    alpha,
    beta,
    gamma,
  })
}, true);

// document.getElementById("click").addEventListener('click', () => {
//   socket.emit('click')
// })
const { innerWidth, innerHeight } = window
document.getElementById("screen-width").innerHTML = innerWidth
document.getElementById("screen-height").innerHTML = innerHeight

function getTouchPositions(e) {
  // document.getElementById("mouseX").innerHTML = e.pageX
  // document.getElementById("mouseY").innerHTML = e.pageY
  // const { clientX, clientY } = e
  const { clientX, clientY } = e.touches[0]
  // const { innerWidth, innerHeight } = window

  // console.log(clientX, clientY)
  socket.emit('move', {
    clientX,
    clientY,
    innerWidth,
    innerHeight,
  })
}