class Game {
  constructor () {
    this.currentPlayer = null
    this.players = []
  }

  addPlayer (player) {
    this.players.push(player)
  }
}

module.exports = Game
