import { fixture, assert, html, nextFrame } from '@open-wc/testing';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import { DataGenerator } from '@advanced-rest-client/arc-data-generator/arc-data-generator.js';
import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';
import '../cookies-list-items.js';

describe('<cookies-list-items>', function() {
  async function basicFixture(items) {
    return await fixture(html`<cookies-list-items
      style="height: 300px;"
      .items="${items}"></cookies-list-items>`);
  }

  async function listDefaultFixture() {
    return await fixture(`<cookies-list-items listtype="default" noautoprojects></cookies-list-items>`);
  }

  async function listCompactFixture() {
    return await fixture(`<cookies-list-items listtype="compact" noautoprojects></cookies-list-items>`);
  }

  async function listComfortableFixture() {
    return await fixture(`<cookies-list-items listtype="comfortable" noautoprojects></cookies-list-items>`);
  }

  describe('empty list', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('renders empty message', () => {
      const node = element.shadowRoot.querySelector('.empty-info');
      assert.ok(node);
    });

    it('does not render selection header', () => {
      const node = element.shadowRoot.querySelector('.selected-counter');
      assert.notOk(node);
    });

    it('keeps selectedItems undefined', () => {
      assert.isUndefined(element.selectedItems);
    });

    it('computes hasSelection', () => {
      assert.isFalse(element.hasSelection);
    });
  });

  describe('items selection', () => {
    let element;
    beforeEach(async () => {
      const cookies = DataGenerator.generateCookiesData({
        size: 5
      });
      element = await basicFixture(cookies);
    });

    it('selects an item on click', async () => {
      const node = element.shadowRoot.querySelector('.cookie-list-item');
      MockInteractions.tap(node);
      await nextFrame();
      assert.isTrue(node.classList.contains('selected'));
    });

    it('sets selectedIndexes', async () => {
      const node = element.shadowRoot.querySelector('.cookie-list-item');
      MockInteractions.tap(node);
      await nextFrame();
      assert.deepEqual(element.selectedIndexes, [0], 'first item is selected');
      const node2 = element.shadowRoot.querySelectorAll('.cookie-list-item')[1];
      MockInteractions.tap(node2);
      await nextFrame();
      assert.deepEqual(element.selectedIndexes, [0, 1], 'first and second items are selected');
    });

    it('sets selectedItems', async () => {
      const node = element.shadowRoot.querySelector('.cookie-list-item');
      MockInteractions.tap(node);
      await nextFrame();
      assert.deepEqual(element.selectedItems[0], element.items[0], 'has first item');
      const node2 = element.shadowRoot.querySelectorAll('.cookie-list-item')[1];
      MockInteractions.tap(node2);
      await nextFrame();
      assert.deepEqual(element.selectedItems[1], element.items[1], 'has second item');
    });

    it('selectes all items', async () => {
      const node = element.shadowRoot.querySelector('.select-all');
      MockInteractions.tap(node);
      await nextFrame();
      assert.lengthOf(element.selectedItems, 5);
    });

    it('deselectes all items', async () => {
      const node = element.shadowRoot.querySelector('.select-all');
      MockInteractions.tap(node);
      await nextFrame();
      MockInteractions.tap(node);
      await nextFrame();
      assert.lengthOf(element.selectedItems, 0);
    });

    it('keeps selected items when selecting all', async () => {
      const item = element.shadowRoot.querySelector('.cookie-list-item');
      MockInteractions.tap(item);
      await nextFrame();
      const node = element.shadowRoot.querySelector('.select-all');
      MockInteractions.tap(node);
      await nextFrame();
      assert.lengthOf(element.selectedItems, 5);
    });

    it('keeps deselected items when deselecting all', async () => {
      const node = element.shadowRoot.querySelector('.select-all');
      MockInteractions.tap(node);
      await nextFrame();
      const item = element.shadowRoot.querySelector('.cookie-list-item');
      MockInteractions.tap(item);
      await nextFrame();
      MockInteractions.tap(node);
      await nextFrame();
      assert.lengthOf(element.selectedItems, 0);
    });

    it('does not change selection when details button is clicked', async () => {
      const item = element.shadowRoot.querySelector('.cookie-list-item anypoint-button');
      MockInteractions.tap(item);
      await nextFrame();
      assert.isUndefined(element.selectedItems);
    });

    it('selectes the item when checkbox is clicked', async () => {
      const item = element.shadowRoot.querySelector('.cookie-list-item anypoint-checkbox');
      MockInteractions.tap(item);
      await nextFrame();
      assert.lengthOf(element.selectedItems, 1);
    });
  });

  describe('Events', () => {
    let element;
    beforeEach(async () => {
      const cookies = DataGenerator.generateCookiesData({
        size: 2
      });
      element = await basicFixture(cookies);
    });

    it('dispatches "list-item-details" event', () => {
      const spy = sinon.spy();
      element.addEventListener('list-item-details', spy);
      const item = element.shadowRoot.querySelector('.cookie-list-item anypoint-button');
      MockInteractions.tap(item);
      assert.isTrue(spy.called);
    });

    it('dispatches "list-items-search" event', () => {
      const spy = sinon.spy();
      element.addEventListener('list-items-search', spy);
      const input = element.shadowRoot.querySelector('[type=search]');
      input.value = 'test';
      input.dispatchEvent(new CustomEvent('search'));
      assert.isTrue(spy.called);
      assert.equal(spy.args[0][0].detail.q, 'test');
    });

    it('dispatches "list-items-export" event', async () => {
      const spy = sinon.spy();
      element.addEventListener('list-items-export', spy);
      const item = element.shadowRoot.querySelector('.cookie-list-item');
      MockInteractions.tap(item);
      await nextFrame();
      const button = element.shadowRoot.querySelector('[data-action=export-selected]');
      MockInteractions.tap(button);
      assert.isTrue(spy.called);
      assert.lengthOf(spy.args[0][0].detail.items, 1);
    });

    it('dispatches "list-items-delete" event', async () => {
      const spy = sinon.spy();
      element.addEventListener('list-items-delete', spy);
      const item = element.shadowRoot.querySelector('.cookie-list-item');
      MockInteractions.tap(item);
      await nextFrame();
      const button = element.shadowRoot.querySelector('[data-action=delete-selected]');
      MockInteractions.tap(button);
      assert.isTrue(spy.called);
      assert.lengthOf(spy.args[0][0].detail.items, 1);
    });
  });

  describe('List types computations', () => {
    const iconWidthProperty = '--anypoint-item-icon-width';
    const iconWidths = ['56px', '48px', '48px'];

    it(`Icon width is not set for inital list style`, async () => {
      const element = await basicFixture();
      const style = getComputedStyle(element).getPropertyValue(iconWidthProperty);
      assert.equal(style.trim(), '');
    });

    it(`Icon width is ${iconWidths[0]} for "default" list style`, async () => {
      const element = await listDefaultFixture();
      const style = getComputedStyle(element).getPropertyValue(iconWidthProperty);
      assert.equal(style.trim(), iconWidths[0]);
    });

    it(`Icon width is ${iconWidths[1]} for "Comfortable" list style`, async () => {
      const element = await listComfortableFixture();
      const style = getComputedStyle(element).getPropertyValue(iconWidthProperty);
      assert.equal(style.trim(), iconWidths[1]);
    });

    it(`Icon width is ${iconWidths[2]} for "Comfortable" list style`, async () => {
      const element = await listCompactFixture();
      const style = getComputedStyle(element).getPropertyValue(iconWidthProperty);
      assert.equal(style.trim(), iconWidths[2]);
    });
  });
});
