const path = require('path')

const express = require('express')
const http = require('http')
const socket = require('socket.io')

const Game = require('./lib/game')
const Player = require('./lib/player')

const app = express()
const server = http.createServer(app)

const io = socket(server)
const port = process.env.PORT || 5000

const game = new Game(io)

io.on('connect', (socket) => {
  const clientId = socket.client.id
  console.log(`Client connected with id: ${clientId}`)

  const player = new Player(clientId)
  player.name = "Spieler" + (game.players.length + 1)

  game.addPlayer(player)
  game.sync()

  socket.on('roll-dice', () => {
    game.findPlayer(clientId).rollDice()
    game.sync()
  })

  socket.on('lift-cup', () => {
    game.findPlayer(clientId).liftCup()
    game.sync()
  })

  socket.on('pick-dice', (index) => {
    game.findPlayer(clientId).pickDice(index)
    game.sync()
  })

  socket.on('put-dice', (index) => {
    game.findPlayer(clientId).putDice(index)
    game.sync()
  })

  socket.on('done', () => {
    game.findPlayer(clientId).setDone()
    game.sync()
  })

  socket.on('saveName', (name) => {
    game.findPlayer(clientId).saveName(name)
    game.sync()
  })

  socket.on('disconnect', (reason) => {
    const clientId = socket.client.id
    console.log(`Client disconnected with id: ${clientId}`)

    game.removePlayer(clientId)
    game.sync()
  })
})


app.use(
  express.static(
    path.join(__dirname, 'public'),
    { extensions: ['html', 'htm'] }
  )
)

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
