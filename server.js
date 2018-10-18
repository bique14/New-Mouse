var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
// require('events').EventEmitter.defaultMaxListeners = 0;

const robotjs = require('robotjs')

server.listen(8080, (err) => {
  if (err) throw err
  console.log('listening on', server.address())
})

app.use(require('express').static('static'))

const degreeToRadian = (degree) => degree / 180 * Math.PI
const toScreen = (v, screenSize) => Math.round(Math.min(1, Math.max(0, v * 0.5 + 0.5)) * screenSize)

io.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' })
  // socket.on('sensor', function (data) {
  //   // console.log(data)
  //   const { alpha, beta, gamma } = data
  //   const xAxis = toScreen(Math.sin(degreeToRadian(gamma)) * 1.5, robotjs.getScreenSize().width)
  //   const yAxis = toScreen(Math.sin(degreeToRadian(beta)) * 2.5, robotjs.getScreenSize().height)
  //   // console.log(xAxis, yAxis)
  //   // robotjs.moveMouse(xAxis, yAxis)
  // })

  socket.on('move', function (data) {
    const { clientX, clientY, innerWidth, innerHeight } = data
    // console.log(data)
    const xAxis = toScreen(-Math.sin(degreeToRadian(clientX)) * 1, robotjs.getScreenSize().width)
    const yAxis = toScreen(-Math.sin(degreeToRadian(clientY)) * 1, robotjs.getScreenSize().height)
    // console.log(xAxis, yAxis)
    robotjs.moveMouse(xAxis, yAxis)
  })
})
