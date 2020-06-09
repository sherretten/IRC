const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const {newRoom, getRoom, getRooms} = require('./utils/rooms')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'Public')))

const PORT = process.env.PORT || 4000


io.on('connect', socket => {
  socket.on('getRooms', () => {
    
  })
})