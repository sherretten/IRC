//this is for irc Nathaniel Sherrett, 5/30/2020
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const {userJoin, getUser, userLeaves, getRoomUsers} = require('./utils/users')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const Bot = 'Bot'
app.use(express.static(path.join(__dirname, 'Public')))

const PORT = process.env.PORT || 3000


  io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
      const user = userJoin(socket.id, username, room)
      socket.join(user.room)

      socket.broadcast.to(user.room).emit('message', formatMessage(Bot,`${user.username} has joined the chat`))// Sent to everyone else

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      })
    })

    socket.on('chatMessage', (message) => {
      const user = getUser(socket.id)
      io.to(user.room).emit('message', formatMessage(user.username,  message))
    })

    socket.on('disconnect', () => {
      const user = userLeaves(socket.id)

      if(user){
        io.to(user.room).emit('message', formatMessage(Bot, `${user.username} has left the chat`)) // Sent to everyone
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        })
      }
    })

    socket.on('addRoom', (roomName) => {

    })

})





server.listen(PORT, () => console.log(`Server running on ${PORT}`))



