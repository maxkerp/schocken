import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';

import Players from '/js/components/players.js';
import Controls from '/js/components/controls.js';
import Client from '/js/client.js';

const socket = io()
const client = new Client(socket)

render(html`<${Controls} client=${client} />`, document.getElementById("controls"));

socket.on('syncState', (state) => {
  console.log(state)

  let playersNode = document.getElementById('players-wrapper')

  render(html`<${Players} players=${state} client=${client} />`, playersNode);
})

