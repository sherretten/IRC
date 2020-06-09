const chatForm = document.getElementById('chat-form')
const roomList = document.getElementById('roomList')
const chatMessage = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const initialRoom = document.getElementById('room')
const userList = document.getElementById('users')
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})

const socket = io()

socket.emit('joinRoom', {username, room})

socket.on('roomUsers', ({room, users}) => {
  outputRoomName(room)
  outputUsers(users)
})
// Message 
socket.on('message', message => {
  console.log(message)
  outputMessage(message)

  chatMessage.scrollTop = chatMessage.scrollHeight
})

const PracticeRooms = ["room1", "room2"]
socket.on('rooms', ({rooms}) => {
  console.log("Rooms: " + rooms);
  for( let i = 0; i < PracticeRooms.length; i++ ){
    outputRooms(PracticeRooms[i])
  }
})

//Message submittion
chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const message = e.target.elements.msg.value

  //Sending a message to the server
  socket.emit('chatMessage', message)

  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

function outputMessage(message){
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `	<p class="meta">${message.username}<span>${message.time}</span></p>
						<p class="text">
							${message.text}
            </p>`
            
  document.querySelector('.chat-messages').appendChild(div)
}

function outputRoomName(room){
  roomName.innerText = room
}

function outputUsers(users){
  userList.innerHTML = `${users.map( user => `<li>${user.username}</li>`).join('')}`
}

function outputRooms(room1){
  console.log(room1)
  const button = document.createElement('button')
  button.innerHTML = room1
  button.onclick = function(){ socket.emit('joinRoom', ({username, room1}))}
  // roomList.innerHTML =  `${rooms.map( room => `<li><button>${room}</button></li>`).join('')}`
  roomList.appendChild(button)
}

function createRoom(){
  var roomName = prompt("Whats the name of the room?")
  socket.emit('addRoom', {roomName})
}

