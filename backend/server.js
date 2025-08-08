const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app) // we have to use http server directly to integrate with socket.io
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

const port = 5000

let onlineUsers = []

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/users', (req, res) => {
  res.json({
    status: 200,
    onlineUsers,
  })
})

io.on('connection', (socket) => {
  socket.on('send-message', (sentMessage) => {
    console.log('message: ' + sentMessage)
    socket.broadcast.emit('receive-message', sentMessage)
  })

  onlineUsers.push(socket.id)
  console.log('Client connected:', socket.id)

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((socketId) => socketId != socket.id)
    console.log('Client disconnected: ', socket.id)
  })
})

server.listen(port, () => {
  console.log(`connected to port ${port}`)
})
