/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { LitElement, css, html } from 'lit-element';
import { moreVert, exportVariant, deleteIcon } from '@advanced-rest-client/arc-icons/ArcIcons.js';
import { AnypointMenuMixin } from '@anypoint-web-components/anypoint-menu-mixin/anypoint-menu-mixin.js';
import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '@anypoint-web-components/anypoint-menu-button/anypoint-menu-button.js';
import '@anypoint-web-components/anypoint-item/anypoint-icon-item.js';
import '@anypoint-web-components/anypoint-item/anypoint-item-body.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '@anypoint-web-components/anypoint-input/anypoint-input.js';

export class CookiesListWrapper extends AnypointMenuMixin(LitElement) {
  render() {
    return html`<slot></slot>`;
  }
}

/**
 * # Cookies list view
 *
 * ## Data model
 * Each cookie item requires following properties:
 * -   `name` (String) Cookie name
 * -   `value` (String) Cookie value
 * -   `domain` (String) Cookie domain
 * -   `path` (String) Cookie path.
 *
 * ### Example
 *
 * ```html
 * <cookies-list-items items="[[cookies]]"></cookies-list-items>
 * ```
 *
 * ## List handling
 *
 * The element uses `<iron-list>` element that creates a virtual list containing
 * limited number of child elements. It allows to load huge number of requests
 * without influencing the performance.
 *
 * ### Styling
 * `<cookies-list-items>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--cookies-list-items` | Mixin applied to the element | `{}`
 * `--action-button` | Mixin apllied to the primary action buttons | `{}`
 * `--secondary-action-button-color` | Color of the secondary action button | * `--primary-color`
 * `--arc-font-body1` | Mixin applied to the element | `{}`
 * `--cookies-list-item` | Mixin applied to each list item | `{}`
 * `--cookies-list-item-selected` | Mixin applied to the selected list item | `{}`
 * `--cookies-list-item-selected-background-color` | Selection color for list items. | `#E0E0E0`
 * `--cookies-list-items-search-input` | Mixin applied to the search input | `{}`
 * `--cookies-list-items-header` | Mixin applied to the list header options section. | `{}`
 * `--cookies-list-items-list` | Mixin applied to the list (`iron-list`) | `{}`
 * `--cookies-list-item-value` | Mixin applied to cookie value label | `{}`
 * `--cookies-list-item-name` |  Mixin applied to cookie name label. | `{}`
 * `--cookies-list-item-url-color` | Domain and path labels color | `rgba(0, 0, 0, 0.54)`
 * `--context-menu-item-color` | Color of the dropdown menu items | ``
 * `--context-menu-item-background-color` | Background olor of the dropdown menu items | ``
 * `--context-menu-item-color-hover` | Color of the dropdown menu items when hovering | ``
 * `--context-menu-item-background-color-hover` | Background olor of the dropdown menu items when hovering | ``
 *
 * @customElement
 * @memberof UiElements
 * @demo demo/index.html
 */
export class CookiesListItems extends LitElement {
  static get styles() {
    return css`
    :host {
      display: flex;
      flex-direction: column;
    }

    .cookie-item.selected > anypoint-icon-item {
      background-color: var(--cookies-list-item-selected-background-color, #E0E0E0);
    }

    .list {
      flex: 1;
      overflow: auto;
    }

    .table-options {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 16px;
    }

    .secondary-action {
      height: 36px;
      font-size: 14px;
    }

    .selected-counter {
      display: inline-block;
      margin-left: 8px;
      font-size: 16px;
    }

    .selected-actions {
      margin-left: 24px;
      flex: 1;
    }

    .spacer {
      flex: 1;
    }

    .search {
      margin-right: 12px;
    }

    .empty-info {
      margin-left: 16px;
      font-size: 16px;
    }

    .cookie-name {
      font-weight: 500;
      margin-right: 12px;
    }

    .icon {
      display: block;
      width: 24px;
      height: 24px;
    }

    :host([listtype="comfortable"]) anypoint-icon-item {
      min-height: 40px;
    }

    :host([listtype="compact"]) anypoint-icon-item {
      min-height: 36px;
    }

    :host([listtype="comfortable"]) anypoint-item-body,
    :host([listtype="compact"]) anypoint-item-body {
      flex-direction: row;
      align-items: center;
      justify-content: start;
    }

    :host([listtype="comfortable"]) [secondary],
    :host([listtype="compact"]) [secondary] {
      margin: 0;
    }

    :host([listtype="comfortable"]) .list-action-button,
    :host([listtype="comfortable"]) anypoint-checkbox {
      height: 32px;
    }

    :host([listtype="compact"]) .list-action-button,
    :host([listtype="compact"]) anypoint-checkbox {
      height: 24px;
    }
    `;
  }

  _headerTemplate() {
    const { hasSelection, compatibility, outlined } = this;
    return html`
    <section class="table-options">
      <anypoint-checkbox
        class="select-all"
        @checked-changed="${this._toggleSelectAll}"
        title="Select / deselect all"
        aria-label="Activate to toggle selection on the list"
      ></anypoint-checkbox>
      ${hasSelection ? this._selectionTemplate() : ''}
      <div class="spacer"></div>
      <div class="search">
        <anypoint-input
          type="search"
          nolabelfloat
          @search="${this._searchHandler}"
          ?compatibility="${compatibility}"
          ?outlined="${outlined}">
          <label slot="label">Search</label>
        </anypoint-input>
      </div>
    </section>`;
  }

  _selectionTemplate() {
    const selectedItems = this.selectedItems || [];
    const { compatibility } = this;
    return html`
    <span class="selected-counter">${selectedItems.length} item(s) selected</span>
    <div class="selected-actions">
      <anypoint-menu-button
        dynamicalign
        closeOnActivate
        id="listMenu"
        ?compatibility="${compatibility}">
        <anypoint-icon-button
          aria-label="Activate to open context menu"
          slot="dropdown-trigger"
          ?compatibility="${compatibility}">
          <span class="icon">${moreVert}</span>
        </anypoint-icon-button>
        <anypoint-listbox
          slot="dropdown-content"
          id="listMenuOptions"
          ?compatibility="${compatibility}">
          <anypoint-icon-item
            class="menu-item"
            data-action="export-selected"
            @click="${this._onExportSelected}">
            <span class="icon" slot="item-icon">${exportVariant}</span>Export selected
          </anypoint-icon-item>
          <anypoint-icon-item
            class="menu-item"
            data-action="delete-selected"
            @click="${this._deleteSelected}">
            <span class="icon" slot="item-icon">${deleteIcon}</span>Delete selected
          </anypoint-icon-item>
        </anypoint-listbox>
      </anypoint-menu-button>
    </div>`;
  }

  _unavailableTemplate() {
    const { hasItems } = this;
    if (hasItems) {
      return '';
    }
    return html`
    <p class="empty-info">The cookies list is empty.</p>`;
  }

  _listTemplate() {
    const items = this.items || [];
    const selected = this.selectedIndexes || [];
    const { compatibility, hasTwoLines } = this;
    return items.map((item, index) => html`
    <anypoint-icon-item
      data-index="${index}"
      class="cookie-list-item"
      tabindex="-1"
      role="option"
      ?compatibility="${compatibility}">
      <anypoint-checkbox
        slot="item-icon"
        .checked="${selected.indexOf(index) !== -1}"
        aria-label="Select or unselect this item"></anypoint-checkbox>
      <anypoint-item-body
        ?twoline="${hasTwoLines}"
        ?compatibility="${compatibility}">
        <div class="cookie-value">
          <span class="cookie-name">${item.name}:</span>${item.value}</div>
        <div secondary>
          ${item.domain} ${item.path}
        </div>
      </anypoint-item-body>
      <anypoint-button
        data-index="${index}"
        class="list-action-button list-secondary-action"
        data-action="item-detail"
        ?compatibility="${compatibility}"
        @click="${this._cookieDetails}"
        title="Open cookie details dialog">Details</anypoint-button>
    </anypoint-icon-item>`);
  }

  render() {
    return html`
    ${this._headerTemplate()}
    ${this._unavailableTemplate()}

    <cookies-list-wrapper
      class="list"
      selectable="anypoint-icon-item"
      multi
      role="listbox"
      aria-label="Select requests from the list"
      useAriaSelected
      @selectedvalues-changed="${this._selectedHandler}">
      ${this._listTemplate()}
    </cookies-list-wrapper>`;
  }

  static get properties() {
    return {
      /**
       * Changes information density of list items.
       * By default it uses material's peper item with two lines (72px heigth)
       * Possible values are:
       *
       * - `default` or empty - regular list view
       * - `comfortable` - enables MD single line list item vie (52px heigth)
       * - `compact` - enables list that has 40px heigth (touch recommended)
       */
      listType: { type: String, reflect: true },
      // The list of cookie items to render.
      items: { type: Array },
      // List of selected items on the list.
      selectedItems: { type: Array },
      /**
       * A list of selected indexes.
       */
      selectedIndexes: { type: Array },
      /**
       * Enables compatibility with Anypoint platform
       */
      compatibility: { type: Boolean },
      /**
       * Enables Material Design outlined style for inputs.
       */
      outlined: { type: Boolean }
    };
  }

  get _list() {
    if (!this.__list) {
      this.__list = this.shadowRoot.querySelector('.list');
    }
    return this.__list;
  }

  get hasItems() {
    const { items } = this;
    return !!(items && items.length);
  }
  /**
   * If true, the user selected some elements on list. Check the
   * `this.selectedItems` property to check for the selected elements.
   */
  get hasSelection() {
    const items = this.selectedIndexes;
    return !!(items && items.length);
  }

  get selectedItems() {
    return this._selectedItems;
  }

  set selectedItems(value) {
    const old = this._selectedItems;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this._selectedItems = value;
    this.dispatchEvent(new CustomEvent('selecteditems-changed', {
      detail: {
        value
      }
    }));
  }

  get listType() {
    return this._listType;
  }

  set listType(value) {
    const old = this._listType;
    if (old === value) {
      return;
    }
    this._listType = value;
    this.requestUpdate('listType', old);
    this._updateListStyles(value);
  }

  get hasTwoLines() {
    const { listType } = this;
    return !listType || listType === 'default';
  }

  clearSelection() {
    this._list.selectedValues = [];
  }
  /**
   * Dispatches `list-item-details` non bubbling custom event with item data.
   * @param {CustomEvent} e
   */
  _cookieDetails(e) {
    e.preventDefault();
    e.stopPropagation();

    const index = Number(e.currentTarget.dataset.index);
    const item = this.items[index];
    this.dispatchEvent(new CustomEvent('list-item-details', {
      composed: true,
      detail: {
        item
      }
    }));
  }
  /**
   * Toggles selection of of all itmes on the list.
   * @param {Event} e
   */
  _toggleSelectAll(e) {
    const allSelected = e.target.checked;

    const items = this.items || [];
    const len = items.length;
    const list = this._list;
    const initialSelected = Array.from(this.selectedIndexes || []);

    for (let i = len - 1; i >= 0; i--) {
      if (allSelected && initialSelected.indexOf(i) === -1) {
        list.selectIndex(i);
      } else if (!allSelected && initialSelected.indexOf(i) !== -1) {
        list.selectIndex(i);
      }
    }
  }
  /**
   * Informs hosting application to delete currently selected items.
   */
  _deleteSelected() {
    this._deselectMenu();
    const selected = this.selectedItems;
    if (!selected || !selected.length) {
      return;
    }
    this.__deleteItems(selected);
  }
  /**
   * Dispatches non bubbling `list-items-delete` event to inform hosting
   * application to remove items.
   * @param {Array<Object>} items List of items to delete.
   */
  __deleteItems(items) {
    this.dispatchEvent(new CustomEvent('list-items-delete', {
      composed: true,
      detail: {
        items
      }
    }));
  }
  /**
   * Requests to export items to Drive
   */
  _onExportSelected() {
    this._deselectMenu();
    const items = this.selectedItems;
    if (!items || !items.length) {
      return;
    }
    this.dispatchEvent(new CustomEvent('list-items-export', {
      composed: true,
      detail: {
        items
      }
    }));
  }
  /**
   * Closes list menu and resets selection.
   */
  _deselectMenu() {
    setTimeout(() => {
      const node = this.shadowRoot.querySelector('#listMenuOptions');
      if (node) {
        node.selected = undefined;
      }
    });
  }
  /**
   * Dispatches the `list-items-search` with current filter value.
   * The event does not bubble.
   * @param {Event} e
   */
  _searchHandler(e) {
    const { value } = e.target;
    this.dispatchEvent(new CustomEvent('list-items-search', {
      composed: true,
      detail: {
        q: value
      }
    }));
    this.clearSelection();
  }

  _selectedHandler(e) {
    /* istanbul ignore next */
    const value = e.detail.value || [];
    this.selectedIndexes = value;
    const items = this.items;
    this.selectedItems = value.map((i) => items[i]);
  }

  /**
   * Updates icon size CSS variable and notifies resize on the list when
   * list type changes.
   * @param {?String} type
   */
  _updateListStyles(type) {
    let size;
    switch (type) {
      case 'comfortable': size = 48; break;
      case 'compact': size = 48; break;
      default: size = 56; break;
    }
    const value = `${size}px`;
    this.style.setProperty('--anypoint-item-icon-width', value);
  }
}
