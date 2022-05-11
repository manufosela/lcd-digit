import {
  html,
  css,
  LitElement
} from 'lit';

export class LcdDigit extends LitElement {
  static get styles() {
    return css /* css */`
      :host {
        width: auto;
        display: block;
        background-color: transparent;
        --dot-size: 16px;
        --dot-margin: calc(var(--dot-size) / 8);
      }
      .digit {
        width: calc(var(--dot-size) * 4 + calc(var(--dot-margin) * 8));
        display: inline-block;
        margin: 10px;
        transform: skewX(-2deg);
        transition: opacity 100ms ease;
      }
      .digit .cell {
        width: var(--dot-size);
        height: var(--dot-size);
        margin: var(--dot-margin);
        background-color: red;
        border-radius: 2px;
        display: inline-block;
        opacity: 0.1;
      }
      .digit .cell.on {
        opacity: 1;
      }
      .dot { 
        position: relative; 
        background: #ff0; 
        z-index: 10;
        width: var(--dot-size); 
        height: var(--dot-size);  
      }
    `;
  }

  static get properties() {
    return {
      display: {
        type: Array,
      },
      digit: {
        type: String,
      },
      count: {
        type: Boolean,
      },
      lcdReference: {
        type: String,
        attribute: 'lcd-reference'
      },
      maxValue: {
        type: Number,
        attribute: 'max-value'
      },
    };
  }

  constructor() {
    super();
    this.display = {
      'empty': [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
      ],
      0: [
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1
      ],
      1: [
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1
      ],
      2: [
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        1, 1, 1, 1,
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 1, 1, 1
      ],
      3: [
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        1, 1, 1, 1
      ],
      4: [
        1, 0, 0, 0,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1
      ],
      5: [
        1, 1, 1, 1,
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        1, 1, 1, 1
      ],
      6: [
        1, 1, 1, 1,
        1, 0, 0, 0,
        1, 0, 0, 0,
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1
      ],
      7: [
        1, 1, 1, 1,
        1, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1
      ],
      8: [
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1
      ],
      9: [
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 0, 0, 1,
        1, 1, 1, 1,
        0, 0, 0, 1,
        0, 0, 0, 1,
        0, 0, 0, 1
      ],
      ':': [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
      ],
    };
    this.digit = 'empty';
    this.count= false;
    this.lcdReference = '';

    this.zeroEvent = this.zeroEvent.bind(this);
    this.setDigitEvent = this.setDigitEvent.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('lcd-digit__count-reset', this.zeroEvent);
    document.addEventListener('lcd-digit__set-digit', this.setDigitEvent);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('lcd-digit__count-reset', this.zeroEvent);
    document.removeEventListener('lcd-digit__set-digit', this.setDigitEvent);
  }

  firstUpdated() {
    this.renderDigit();
    if (this.count) {
      this.counter();
    }
  }

  updated() {
    this.renderDigit();
  }

  setDigitEvent(e) {
    e.stopPropagation();
    const reference = e.detail.id;
    if (reference === this.id) {
      this.setDigit(e.detail.digit);
    }
  }

  setDigit(digit) {
    this.digit = digit;
  }

  zeroEvent(e) {
    e.stopPropagation();
    const reference = e.detail.id;
    if (reference === this.lcdReference) {
      this.addOne();
    }
  }

  addOne() {
    this.digit = (this.digit + 1) % 10;
    if (this.digit === this.maxValue) {
      this.digit = 0;
      this._checkValue();
    }
  }

  _checkValue() {
    if (this.digit === 0) {
      document.dispatchEvent(new CustomEvent('lcd-digit__count-reset', {
        detail: {
          id: this.id
        }
      }));
    }
  }

  counter() {
    setInterval(() => {
      this.addOne();
      this._checkValue();
    }, 1000);
  }

  renderDigit() {
    this.digit = (!isNaN(parseInt(this.digit, 10) % 10)) ? parseInt(this.digit, 10) % 10 : (this.digit === ':') ? this.digit : 'empty';
    const container = this.shadowRoot.querySelector('#digit');
    const matrix = this.display[this.digit];
    const {
      children
    } = container;
    const len = matrix.length;
    for (let i = 0; i < len; i++) {
      children[i].classList.remove('on');
      if (matrix[i]) {
        children[i].classList.add('on');
      }
    }
  }

  render() {
    const nDots = [...Array(28).keys()];
    return html `
      <style>
        .digit {
          width: ${this.dotSize*5}px;
        }
        .digit .cell {
          width: ${this.dotSize}px;
          height: ${this.dotSize}px;
      </style>
      <div id="digit" class="digit">
        ${nDots.map(() => html`<div class="cell"></div>`)}
      </div>
    `;
  }
}
