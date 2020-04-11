class Player {
  constructor (id, io) {
    this.io = io
    this.id = id
    this.name = null
    this.dice = []
    this.cupState = 'down'
    this.cupDice = [2, 1, 2]
    this.done = false
  }

  rollDice (data) {
    console.log(`Server: roll-dice by ${this.id}`)

    if (this.cupState === 'down') {

    } else {
      const newDice = []
      let dice

      for (dice of this.cupDice) {
        newDice.push(Math.floor(Math.random() * 6) + 1)
      }

      this.cupDice = newDice
      this.cupState = 'down'

      this.sync()
    }
  }

  liftCup (data) {
    console.log(`Server: lift-cup by ${this.id}`)
    this.cupState = 'up'

    this.sync()
  }

  pickDice (index) {
    console.log(`Server: pick-dice by ${this.id}`)

    this.dice.concat(this.cupDice.splice(index, 1))

    this.sync()
  }

  setDone (data) {
    console.log(`Server: done by ${this.id}`)
    this.done = true

    this.sync()
  }

  saveName (name) {
    this.name = name

    this.sync()
  }

  sync () {
    const state = {
      id: this.id,
      name: this.name,
      dice: this.dice,
      cupState: this.cupState,
      cupDice: this.cupDice,
      done: this.done
    }

    this.io.emit('syncState', state)

    console.log(`Server: sync by ${this.id}`)
  }
}

module.exports = Player
