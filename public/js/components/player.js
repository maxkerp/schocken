import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.module.js';

class Player extends Component {
  pickDice (index) {
    this.props.client.pickDice(index)
  }

  putDice (index) {
    this.props.client.putDice(index)
  }

  cupOrDices () {
    if (this.props.cupState === "down") {
      return html`
        <div class="card-image" onClick=${() => { this.props.client.liftCup() }}>
          <figure class="image is-4by3" >
            <img src="/img/cup.jpg" alt="cup image"/>
          </figure>
        </div>
      `
    } else {
      return html`
        <div class="level">
          <div class="level-item" onClick=${() => { this.pickDice(0) }}>
            ${this.dice(this.props.cupDice[0])}
          </div>
          <div class="level-item" onClick=${() => { this.pickDice(1) }}>
            ${this.dice(this.props.cupDice[1])}
          </div>
          <div class="level-item" onClick=${() => { this.pickDice(2) }}>
            ${this.dice(this.props.cupDice[2])}
          </div>
        </div>
      `
    }
  }

  dice (eyes) {
    if (eyes) {
      return html`<div><img src="/img/dice${eyes}.png" alt="cup image"/></div>`
    }
  }

  render({ name , dice, cupDice, cupState, done }) {
    return html`
      <div class="card">
        <header class="card-header">
          <p class="card-header-title is-centered is-fullwidth">
            ${this.props.name || this.props.id}
          </p>
        </header>

        <div class="card-content">
          ${ this.cupOrDices() }
        </div>

        <div class="card-content">
          <nav class="level">
            <div class="level-item" onClick=${() => { this.putDice(0) }}>
              ${ this.dice(this.props.dice[0]) }
            </div>
            <div class="level-item" onClick=${() => { this.putDice(1) }}>
              ${ this.dice(this.props.dice[1]) }
            </div>
            <div class="level-item" onClick=${() => { this.putDice(2) }}>
                ${ this.dice(this.props.dice[2]) }
            </div>
          </nav>
        </div>

        <footer class="card-footer">
          <a href="#" onClick=${ () => this.props.client.rollDice() }class="card-footer-item is-size-4 has-text-weight-bold has-text-black">Würfeln</a>
        </footer>
      </div>
    `;
  }

}

export default Player
