var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
// require('events').EventEmitter.defaultMaxListeners = 0;

const robotjs = require('robotjs')
const port = 8080

server.listen(port, (err) => {
  if (err) throw err
  console.log('listening on', server.address())
})

app.use(require('express').static('static'))

const degreeToRadian = (degree) => degree / 180 * Math.PI
const toScreen = (v, screenSize) => Math.round(Math.min(1, Math.max(0, v * 0.5 + 0.5)) * screenSize)

io.on('connection', function (socket) {
  socket.on('click', () => {
    robotjs.mouseClick('left', false)
  })
  socket.on('move', function (data) {
    const { clientX, clientY, innerWidth, innerHeight } = data
    // console.log(data)
    const xAxis = toScreen(-Math.sin(degreeToRadian(clientX)) * 1, robotjs.getScreenSize().width)
    const yAxis = toScreen(-Math.sin(degreeToRadian(clientY)) * 1, robotjs.getScreenSize().height)
    // console.log(xAxis, yAxis)
    robotjs.moveMouse(xAxis, yAxis)
  })
})
