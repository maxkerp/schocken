import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.module.js';

class Controls extends Component {

  rollDice () {
    console.log('rollDice clicked')

    this.props.client.rollDice()
  }

  liftCup () {
    console.log('liftCup clicked')

    this.props.client.liftCup()
  }

  done () {
    console.log('done clicked')

    this.props.client.done()
  }

  saveName () {
    const username = document.getElementById('username').value

    console.log(`CLICK: ${username}`)

    this.props.client.saveName(username)
  }

  render() {
    return html`
      <nav class="level">
        <div class="level-item has-text-centered">
          <div class="field has-addons">
            <div class="control">
              <input id="username" class="input is-medium" type="text" placeholder="Username"/>
            </div>
            <div class="control">
              <input id="save" class="button is-medium" name="save" type="submit" value="Speichern" onClick=${ () => this.saveName() }/>
            </div>
          </div>
        </div>
      </nav >
    `
  }
}

export default Controls
