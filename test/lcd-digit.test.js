import { html, fixture, expect } from '@open-wc/testing';

import '../lcd-digit.js';

/**
 *  this.digit = 'empty';
    this.count = false;
    this.lcdReference = '';
    this.increment = 1;
    this.maxValue = 9;
    this.intervalId = null;
 */
describe('LcdDigit', () => {
  it('has a default lcdReference is "", count is false, digit is "empty", increment is 1 and maxValue is 9', async () => {
    const el = await fixture(html` <lcd-digit></lcd-digit> `);

    expect(el.digit).to.equal('empty');
    expect(el.count).to.equal(false);
    expect(el.lcdReference).to.equal('');
    expect(el.increment).to.equal(1);
    expect(el.maxValue).to.equal(9);
  });

  it('shows initially the digit 8 with 4*7 divs', async () => {
    const el = await fixture(html` <lcd-digit></lcd-digit> `);

    expect(el).shadowDom.to.equal(`
      <div id="digit" class="digit">
        <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
        <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
        <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
        <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
        <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
        <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
        <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
      </div>
    `);
  });

  it('can override the digit via attribute', async () => {
    const el = await fixture(html` <lcd-digit digit="8"></lcd-digit> `);

    expect(el.digit).to.equal(8);
  });

  it('can override the increment via attribute', async () => {
    const el = await fixture(html` <lcd-digit increment="-1"></lcd-digit> `);

    expect(el.increment).to.equal(-1);
  });

  it('can override the maxValue via attribute', async () => {
    const el = await fixture(html` <lcd-digit max-value="5"></lcd-digit> `);

    expect(el.maxValue).to.equal(5);
  });

  it('can override the count via attribute', async () => {
    const el = await fixture(html` <lcd-digit digit="1" count></lcd-digit> `);

    expect(el.count).to.equal(true);
  });

  it('can override the lcdReference via attribute', async () => {
    const el = await fixture(html`
      <lcd-digit lcd-reference="secUnits"></lcd-digit>
    `);

    expect(el.lcdReference).to.equal('secUnits');
  });
});
