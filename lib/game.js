class Game {
  constructor (io) {
    this.io = io
    this.currentPlayer = null
    this.players = []
  }

  addPlayer (player) {
    this.players.push(player)
  }

  removePlayer (id) {
    const player = this.findPlayer(id)
    const index = this.players.indexOf(player)

    this.players.splice(index, 1)
  }

  findPlayer (id) {
    return this.players.filter(player => player.id === id)[0]
  }

  sync() {
    const state = this.players.map(player => player.getState())

    this.io.emit("syncState", state)
  }
}

module.exports = Game
