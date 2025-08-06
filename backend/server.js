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

app.get('/', (req, res) => {
  res.send('hello world')
})

io.on('connection', (socket) => {
  socket.on('send-message', (msg) => {
    console.log('message: ' + msg)
  })
  console.log('a user connected', socket.id)
})

server.listen(port, () => {
  console.log(`connected to port ${port}`)
})
