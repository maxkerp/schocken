class Player {
  constructor (socket) {
    this.socket = socket
    this.dice = []
    this.cupState = 'down'
    this.cupDice = [2, 1, 2]

    this.listen()
  }

  listen () {
    this.socket.on('roll-dice', this.rollDice)
    this.socket.on('lift-cup', this.liftCup)
    this.socket.on('pick-dice', this.pickDice)
    this.socket.on('done', this.done)
  }

  rollDice (data) {
    console.log(`Server: roll-dice by ${this.socket.client.id}`)

    if (this.cupState === 'down') {

    } else {
      const newDice = []

      for (dice of this.cupDice) {
        newDice.push(Math.floor(Math.random() * 6) + 1)
      }

      this.cupDice = newDice
      this.cupState = 'down'
    }
  }

  liftCup (data) {
    console.log(`Server: lift-cup by ${this.socket.client.id}`)
    this.cupState = 'up'
  }

  pickDice (index) {
    console.log(`Server: pick-dice by ${this.socket.client.id}`)

    this.dice.concat(this.cupDice.splice(index, 1))
  }

  done (data) {
    console.log(`Server: done by ${this.socket.client.id}`)
    this.done = true
  }

  sync () {
    const state = {
      id: this.socket.client.id,
      dice: this.dice,
      cupState: this.cupState,
      cupDice: this.cupDice
    }

    this.socket.broadcast.emit('sync', state)

    console.log(
      `Server: sync by ${this.socket.client.id}\n`,
      JSON.stringify(state)
    )
  }
}

module.exports = Player
