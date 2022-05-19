import { css } from 'lit';

export const lcdDigitStyles = css/* css */ `
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
