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

const game = Game()

io.on('connect', (socket) => {
  const clientId = socket.client.id
  console.log(`Client connected with id: ${clientId}`)

  game.addPlayer(Player(socket))
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
