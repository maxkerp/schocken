import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.module.js';

import Player from '/js/components/player.js';

class Players extends Component {
  render({ players, client }) {

    return html`
      ${players.map(player => html`
        <div class="column is-one-fifth-desktop is-one-third-tablet">
          <${Player} ...${player} client=${client}/>
        </div>
      `)}
    `
  }

}

export default Players
