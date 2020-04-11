const socket = io()


const UI = {

  render: function (state)  {
    const playerTemplate = `
    <div id="${state.id}">
      <div id="cup">
        <span id="name">${state.name || state.id}</span>
        <span id="dice1">${state.cupDice[0]}</span>
        <span id="dice2">${state.cupDice[1]} </span>
        <span id="dice3">${state.cupDice[2]} </span>
      </div>
      <div id="taken">
        <span id="dice1">${state.dice[0] || ""}</span>
        <span id="dice2">${state.dice[1] || ""} </span>
        <span id="dice3">${state.dice[2] || ""} </span>
      </div>
    </div>
    `

    const oldView = document.getElementById(state.id)
    const newView = this.create(playerTemplate)

    if (!oldView) {
      console.log("old")
      document.body.appendChild(newView)
    } else {
      console.log("new")
      oldView.parentNode.replaceChild(newView, oldView);
    }
  },

  create: function (htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    return div.firstChild;
  }
}

socket.on('syncState', (state) => {
  console.log(state)

  UI.render(state)
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

  saveName (name) {
    console.log('Client: saveName')
    this.socket.emit('saveName', name)
  }
}

const client = new Client(socket)

const rollDiceButton = document.getElementById('rollDice')

rollDiceButton.addEventListener('click', (e) => {
  console.log('rollDice clicked')

  client.rollDice()
})

const liftCupButton = document.getElementById('liftCup')

liftCupButton.addEventListener('click', (e) => {
  console.log('liftCup clicked')

  client.liftCup()
})

const doneButton = document.getElementById('done')

doneButton.addEventListener('click', (e) => {
  console.log('done clicked')

  client.done()
})

const usernameInput = document.getElementById('username')
const usernameSave = document.getElementById('save')

usernameSave.addEventListener('click', (e) => {
  e.preventDefault()

  const username = usernameInput.value

  console.log(`CLICK: ${username}`)

  client.saveName(username)
})
