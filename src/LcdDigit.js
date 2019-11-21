import {
  html,
  css,
  LitElement
} from 'lit-element';

export class LcdDigit extends LitElement {
  static get styles() {
    return css `
      :host {
        display: block;
        background-color: trasnparent;
        --dot-size: 16px;
      }
      .digit {
        display: inline-block;
        margin: 10px;
        transform: skewX(-2deg);
        transition: opacity 100ms ease;
      }
      .digit .cell {
        width: var(--dot-size);
        height: var(--dot-size);
        margin: 2px;
        background-color: red;
        border-radius: 2px;
        display: inline-block;
        opacity: 0.1;
      }
      .digit .cell.on {
        opacity: 1;
      }
      .dot { 
        position:relative; background:#FF0; z-index:10; width:var(--dot-size); height:var(--dot-size); max-width:16px; max-height:16px; 
      }
    `;
  }

  static get properties() {
    return {
      display: {
        type: Array
      },
      dotSize: {
        type: Number
      },
      typeClass: {
        type: String
      },
      digit: {
        type: Number
      }
    };
  }

  constructor(digit) {
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
      ]
    };
    this.digit = digit;
    this.dotSize = 16;
    this.typeClass = '';
  }

  firstUpdated() {
    this.renderDigit();
  }

  updated() {
    this.renderDigit();
  }

  renderDigit() {
    const container = this.shadowRoot.querySelector('#digit');
    const matrix = this.display[(!isNaN(parseInt(this.digit, 10) % 10)) ? parseInt(this.digit, 10) % 10 : 'empty'];
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
    const dotDecPos = (this.dotSize > 16) ? -16 : -parseInt(this.dotSize, 10);
    const comma = (this.typeClass === 'second') ? html `<div class="dot" style="top:${dotDecPos}px; left:${dotDecPos}px;">O</div>` : '';
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
      <div id="digit" class="digit ${this.typeClass}">
        ${nDots.map(() => html`<div class="cell"></div>`)}
        ${comma}
      </div>
    `;
  }
}
