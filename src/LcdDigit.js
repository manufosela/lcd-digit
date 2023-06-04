/* eslint-disable spaced-comment */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { html, LitElement } from 'lit';
import { lcdDigitStyles } from './lcd-digit-styles.js';
import { numbersLcdMatrix } from './numbersLcdMatrix.js';

export class LcdDigit extends LitElement {
  static get styles() {
    return [lcdDigitStyles];
  }

  static get properties() {
    return {
      display: {
        type: Array,
      },
      digit: {
        type: String,
        reflect: true,
      },
      count: {
        type: Boolean,
      },
      lcdReference: {
        type: String,
        attribute: 'lcd-reference',
      },
      maxValue: {
        type: Number,
        attribute: 'max-value',
      },
      increment: {
        type: Number,
      },
    };
  }

  constructor() {
    super();
    this.display = numbersLcdMatrix;
    this.digit = 'empty';
    this.count = false;
    this.lcdReference = '';
    this.increment = 1;
    this.maxValue = 9;
    this.intervalId = null;
    

    this.zeroEvent = this.zeroEvent.bind(this);
    this.setDigitEvent = this.setDigitEvent.bind(this);
  }

  _addEvents() {
    document.addEventListener('lcd-digit__count-reset', this.zeroEvent);
    document.addEventListener('lcd-digit__set-digit', this.setDigitEvent);
    document.addEventListener('lcd-digit__start-count', this.counter);
    document.addEventListener('lcd-digit__stop-count', this.stopCounter);
  }

  _removeEvents() {
    document.removeEventListener('lcd-digit__count-reset', this.zeroEvent);
    document.removeEventListener('lcd-digit__set-digit', this.setDigitEvent);
    document.removeEventListener('lcd-digit__start-count', this.counter);
    document.removeEventListener('lcd-digit__stop-count', this.stopCounter);
  }

  connectedCallback() {
    super.connectedCallback();
    this._addEvents();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeEvents();
  }

  firstUpdated() {
    this.renderDigit();
    if (this.count) {
      this.counter();
    } else {
      clearInterval(this.intervalId);
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
      if(this.increment !==1){
        this.increment;
      } else {
        this.increment = e.detail.increment ? e.detail.increment : 1;
      }    
      
      this.modifyOne();
    }
  }

  modifyOne() {
    this.digit = (this.digit + this.increment) % 10;
    if (this.digit > this.maxValue) {
      this.digit = 0;
    }
    if (this.digit < 0) {
      this.digit = this.maxValue;
    }
    
    this._checkValue();
  }

  _checkValue() {
    if (
      (this.digit === 0) ||
      (this.digit === this.maxValue && this.increment === -1) 
    ) {
      document.dispatchEvent(
        new CustomEvent('lcd-digit__count-reset', {
          detail: {
            id: this.id,
            increment: this.increment,
          },
        })
      );
    }
  }

  counter() {
    this.count = true;
    this.intervalId = setInterval(() => {
      this.modifyOne();
    }, 1000);
  }

  stopCounter() {
    clearInterval(this.intervalId);
    this.count = false;
  }

  renderDigit() {
    const colonValue = this.digit === ':' ? this.digit : 'empty';
    this.digit = !Number.isNaN(parseInt(this.digit, 10) % 10)
      ? parseInt(this.digit, 10) % 10
      : colonValue;
    const container = this.shadowRoot.querySelector('#digit');
    const matrix = this.display[this.digit];
    const { children } = container;
    const len = matrix.length;
    for (let i = 0; i < len; i += 1) {
      children[i].classList.remove('on');
      if (matrix[i]) {
        children[i].classList.add('on');
      }
    }
  }

  render() {
    const nDots = [...Array(28).keys()];
    return html`
      <style>
        .digit {
          width: ${this.dotSize * 5}px;
        }
        .digit .cell {
          width: ${this.dotSize}px;
          height: ${this.dotSize}px;
        }
      </style>
      <div id="digit" class="digit">
        ${nDots.map(() => html`<div class="cell"></div>`)}
      </div>
    `;
  }
}
