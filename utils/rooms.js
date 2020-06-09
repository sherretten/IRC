// const roomList = document.getElementById('room')

// const rooms = ["Room 1, Room 2"]

// function newRoom(name){
//   const room = {name}
//   if(rooms.find(room => room.name === name) === undefined){
//     rooms.push(room)
//     return room
//   }
// }

// function getRoom(id){
//   return rooms.find(room => room.id === id)
// }

// function getRooms(){
//   return ({rooms})
// }


// function intialRooms(rooms){
//   console.log(rooms)
//   initialRoom.innerHTML = `${rooms.map( room => `<option value="${room.name}">${room.name}</option>`)}`
// }
// module.exports ={
//   newRoom, 
//   getRoom,
//   getRooms,
// }

// const roomL = document.getElementById('room')
// const socket = io()

// roomL.onclick(() =>{
//   socket.emit('getRooms')
// })

// socket.on('sendRooms', (rooms)=>{
//   console.log(rooms)
//   outputRooms(rooms)
// })

// function outputRooms(rooms){
//   rooms.forEach((room) => {
//     let option = document.createElement("option")
//     option.textContent = room.name
//     option.value = room.name
//     roomL.appendChild(option)
//   })
// }