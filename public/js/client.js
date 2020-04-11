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

export default Client
