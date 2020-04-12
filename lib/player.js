class Player {
  constructor (id, io) {
    this.io = io
    this.id = id
    this.name = null
    this.dice = []
    this.cupState = 'down'
    this.cupDice = [2, 3, 2]
    this.done = false
  }

  rollDice (data) {
    console.log(`Server: roll-dice by ${this.id}`)

    const newDice = []
    let dice

    for (dice of this.cupDice) {
      newDice.push(Math.floor(Math.random() * 6) + 1)
    }

    this.cupDice = newDice
    this.cupState = 'down'
  }

  liftCup (data) {
    console.log(`Server: lift-cup by ${this.id}`)
    this.cupState = 'up'
  }

  pickDice (index) {
    console.log(`Server: pick-dice by ${this.id}`)

    this.dice = this.dice.concat(this.cupDice.splice(index, 1))
  }

  putDice (index) {
    console.log(`Server: put-dice by ${this.id}`)

    this.cupDice = this.cupDice.concat(this.dice.splice(index, 1))
  }

  setDone (data) {
    console.log(`Server: done by ${this.id}`)
    this.done = true
  }

  saveName (name) {
    this.name = name
  }

  getState () {
    return {
      id: this.id,
      name: this.name,
      dice: this.dice,
      cupState: this.cupState,
      cupDice: this.cupDice,
      done: this.done
    }
  }
}

module.exports = Player
