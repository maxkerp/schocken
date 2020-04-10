const socket = io()

socket.on('new-peer', (data) => {
  const peer = document.createElement('h3')
  peer.innerHTML = JSON.stringify(data)

  document.body.appendChild(peer)
})

socket.on('introduction', (data) => {
  console.log(`INTRODUCTION: ${data}`)

  const peer = document.createElement('h3')
  peer.innerHTML = JSON.stringify(data)

  document.body.appendChild(peer)
})

const usernameInput = document.getElementById('username')
const usernameSave = document.getElementById('save')
usernameSave.addEventListener('click', (e) => {
  console.log(`CLICK: ${usernameInput.value}`)
  e.preventDefault()

  socket.emit('introduction', usernameInput.value)
})

const rollDiceButton = document.getElementById('save')
rollDiceButton.addEventListener('click', (e) => {
  console.log(`CLICK: ${usernameInput.value}`)
  e.preventDefault()
})

class Client {
  constructor (socket) {
    this.socket = socket
  }

  rollDice () {
    console.log('Client: roll-dice')
    this.socket.emit('roll-dice')
  }

  liftCup () {
    console.log('Client: lift-cup')
    this.socket.emit('lift-cup')
  }

  pickDice () {
    console.log('Client: pick-dice')
    this.socket.emit('pick-dice')
  }

  done () {
    console.log('Client: done')
    this.socket.emit('done')
  }
}

const client = Client(socket)
