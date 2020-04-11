import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.module.js';

class Player extends Component {
  pickDice (index) {
    client.pickDice(index)
  }

  putDice (index) {
    client.putDice(index)
  }

  cupOrDices () {
    if (this.props.cupState === "down") {
      return html`
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="/img/cup.jpg" alt="cup image">
          </figure>
        </div>
      `
    } else {
      return html`
        <div class="card-content">
          <nav class="level">
            <div class="level-item has-text-centered" onClick=${() => { this.pickDice(0) }}>
              <div>
                ${this.dice(this.props.cupDice[0])}
              </div>
            </div>
            <div class="level-item has-text-centered" onClick=${() => { this.pickDice(1) }}>
              <div>
                ${this.dice(this.props.cupDice[1])}
              </div>
            </div>
            <div class="level-item has-text-centered" onClick=${() => { this.pickDice(2) }}>
              <div>
                ${this.dice(this.props.cupDice[2])}
              </div>
            </div>
          </nav>
        </div>
      `
    }
  }

  dice (eyes) {
    if (eyes) {
      return html`<div><img src="/img/dice${eyes}.png" alt="cup image"></div>`
    }
  }

  render({ name , dice, cupDice, cupState, done }) {
    return html`
      <div id="player" class="tile is-parent">
        <div class="tile is-child">

          <div class="card">
            <header class="card-header">
              <p class="card-header-title is-centered">
                ${this.props.name || this.props.id}
              </p>
            </header>

            ${ this.cupOrDices() }

            <div class="card-content">
              <nav class="level">
                <div class="level-item has-text-centered" onClick=${() => { this.putDice(0) }}>
                  <div>
                    ${ this.dice(this.props.dice[0]) }
                  </div>
                </div>
                <div class="level-item has-text-centered" onClick=${() => { this.putDice(1) }}>
                  <div>
                    ${ this.dice(this.props.dice[1]) }
                  </div>
                </div>
                <div class="level-item has-text-centered" onClick=${() => { this.putDice(2) }}>
                  <div>
                    ${ this.dice(this.props.dice[2]) }
                  </div>
                </div>
              </nav>
            </div>


            <div class="content">

            </div>
          </div>

        </div>
      </div>
    `;
  }

}

const socket = io()

socket.on('syncState', (state) => {
  console.log(state)

  let playerNode = document.getElementById(state.id)
  let playersNode = document.getElementById('players-wrapper')

  if (!playerNode) {
    playerNode = document.createElement('div')
    playerNode.id = state.id
    playersNode.appendChild(playerNode)
  }

  render(html`<${Player} ...${state}/>`, playerNode);
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

  pickDice (index) {
    console.log('Client: pick-dice')
    this.socket.emit('pick-dice', index)
  }

  putDice (index) {
    console.log('Client: put-dice')
    this.socket.emit('put-dice', index)
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
