class Game {
  constructor () {
    this.currentPlayer = null
    this.players = []
  }

  addPlayer (player) {
    this.players.push(player)
  }

  findPlayer (id) {
    return this.players.filter(player => player.id === id)[0]
  }
}

module.exports = Game
