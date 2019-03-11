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
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@advanced-rest-client/arc-icons/arc-icons.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';
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
 * @polymer
 * @customElement
 * @memberof UiElements
 * @demo demo/index.html
 */
class CookiesListItems extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      @apply --arc-font-body1;
      @apply --layout-vertical;
      @apply --cookies-list-items;
    }

    #list {
      @apply --layout-flex;
    }

    .cookie-item > paper-icon-item {
      @apply --cookies-list-item;
    }

    .cookie-item.selected > paper-icon-item {
      background-color: var(--cookies-list-item-selected-background-color, #E0E0E0);
      @apply --cookies-list-item-selected;
    }

    paper-item-body {
      @apply --cookies-list-items-body;
    }

    .table-options {
      @apply --layout-horizontal;
      @apply --layout-center;
      padding-left: 16px;
      @apply --cookies-list-items-header;
    }

    .table-options .hiddable {
      opacity: 1;
      transition: opacity 0.2s cubic-bezier(0.47, 0, 0.75, 0.72);
    }

    .table-options.inactive .hiddable {
      pointer-events: none;
      opacity: 0;
    }

    .secondary-action {
      color: var(--cookies-list-item-secondary-action-color, var(--primary-color));
      height: 36px;
      font-size: 14px;
    }

    .selected-counter {
      display: inline-block;
      margin-left: 8px;
      font-size: 16px;
      @apply --cookies-list-items-selection-counter;
    }

    .selected-actions {
      margin-left: 24px;
      @apply --layout-flex;
    }

    .search {
      margin-right: 12px;
    }

    #search {
      @apply --cookies-list-items-search-input;
    }

    .empty-info {
      margin-left: 16px;
      font-size: 16px;
      @apply --empty-info;
    }

    .cookie-value {
      @apply --cookies-list-item-value;
    }

    .cookie-name {
      font-weight: 500;
      margin-right: 12px;
      @apply --cookies-list-item-name;
    }

    div[secondary] {
      color: var(--cookies-list-item-url-color, var(--secondary-text-color));
    }

    paper-listbox iron-icon {
      color: var(--context-menu-item-color);
    }

    paper-listbox paper-icon-item {
      color: var(--context-menu-item-color);
      background-color: var(--context-menu-item-background-color);
      cursor: pointer;
    }

    paper-listbox paper-icon-item:hover {
      color: var(--context-menu-item-color-hover);
      background-color: var(--context-menu-item-background-color-hover);
    }

    paper-listbox paper-icon-item:hover iron-icon {
      color: var(--context-menu-item-color-hover);
    }
    </style>
    <section class\$="table-options [[_computeOptionsTableClass(hasSelection)]]">
      <paper-checkbox class="select-all" checked="{{allSelected}}" title="Select / deselect all"></paper-checkbox>
      <span class="selected-counter hiddable">[[selectedItems.length]] item(s) selected</span>
      <div class="selected-actions hiddable">
        <paper-menu-button dynamic-align="" id="listMenu">
          <paper-icon-button icon="arc:more-vert" slot="dropdown-trigger"></paper-icon-button>
          <paper-listbox slot="dropdown-content" id="listMenuOptions">
            <paper-icon-item data-action="export-selected" class="menu-item" on-click="_onExportSelected">
              <iron-icon icon="arc:export-variant" slot="item-icon"></iron-icon>
              Export selected
            </paper-icon-item>
            <paper-icon-item data-action="delete-selected" on-click="_deleteSelected" class="menu-item">
              <iron-icon icon="arc:delete" slot="item-icon"></iron-icon>
              Delete selected
            </paper-icon-item>
            <slot name="list-context-menu"></slot>
          </paper-listbox>
        </paper-menu-button>
      </div>
      <div class="search">
        <paper-input id="search" label="Search" no-label-float="" value="{{keyword}}" type="search"></paper-input>
      </div>
    </section>
    <template is="dom-if" if="[[empty]]">
      <p class="empty-info">No items to display.</p>
    </template>
    <iron-list id="list"
      items="[[items]]"
      selected-items="{{selectedItems}}"
      multi-selection=""
      selection-enabled=""
      hidden\$="[[empty]]">
      <template>
        <div class="item-wrapper">
          <div class\$="cookie-item [[_computeRowClass(selected)]]">
            <paper-icon-item tabindex\$="[[tabIndex]]" aria-label\$="Select/Deselect [[item.url]]">
              <paper-checkbox checked="[[selected]]" slot="item-icon" on-iron-change="_checkboxChange"></paper-checkbox>
              <paper-item-body two-line="">
                <div class="cookie-value"><span class="cookie-name">[[item.name]]:</span>[[item.value]]</div>
                <div secondary="">
                  [[item.domain]] [[item.path]]
                </div>
              </paper-item-body>
              <paper-button
                class="secondary-action"
                data-action="item-detail"
                on-click="_cookieDetails">Details</paper-button>
            </paper-icon-item>
          </div>
        </div>
      </template>
    </iron-list>
`;
  }

  static get is() {
    return 'cookies-list-items';
  }
  static get properties() {
    return {
      // The list of cookie items to render.
      items: Array,
      // List of selected items on the list.
      selectedItems: {
        type: Array,
        notify: true
      },
      /**
       * If true, the user selected some elements on list. Check the
       * `this.selectedItems` property to check for the selected elements.
       */
      hasSelection: {
        type: Boolean,
        value: false,
        computed: '_computeHasSelection(selectedItems.length)',
        notify: true
      },
      /**
       * True to select / deselect all elements on the list
       */
      allSelected: {type: Boolean, observer: '_toggleSelectAll'},
      /**
       * Search query
       */
      keyword: {
        type: String,
        notify: true
      },
      /**
       * Computed value, true if there's no items to render.
       */
      empty: {
        type: Boolean,
        value: true,
        computed: '_computeEmpty(items)'
      }
    };
  }

  static get observers() {
    return [
      '_sizeChanged(items.length)'
    ];
  }

  constructor() {
    super();
    this._searchList = this._searchList.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'list');
    }
    afterNextRender(this, () => {
      this.$.search.inputElement.addEventListener('search', this._searchList);
    });
  }

  disconnectedCallback() {
    this.$.search.inputElement.removeEventListener('search', this._searchList);
    super.disconnectedCallback();
  }

  // Notifies the list about the change. It re-renders the items.
  refresh() {
    this.$.list.dispatchEvent(new CustomEvent('iron-resize', {
      composed: true,
      bubbles: true
    }));
  }

  _sizeChanged(length) {
    if (length) {
      setTimeout(() => {
        this.refresh();
      }, 1);
    }
  }
  /**
   * Computes selection class name for a row of the table.
   * @param {Boolean} selected
   * @return {String}
   */
  _computeRowClass(selected) {
    return selected ? 'selected' : '';
  }
  /**
   * Dispatches `list-item-details` non bubbling custom event with item data.
   * @param {CustomEvent} e
   */
  _cookieDetails(e) {
    const item = e.model.get('item');
    this.dispatchEvent(new CustomEvent('list-item-details', {
      composed: true,
      detail: {
        item
      }
    }));
  }
  /**
   * Computes value for `hasSelection`
   * @param {Number} length
   * @return {Boolean}
   */
  _computeHasSelection(length) {
    return !!length;
  }
  /**
   * Toggles selection of of all itmes on the list.
   * @param {Boolean} allSelected Current state of the `allSelected` property.
   */
  _toggleSelectAll(allSelected) {
    const selectedLen = this.selectedItems === undefined ? -1 : this.selectedItems.length;
    const len = (this.items && this.items.length) || 0;
    if (selectedLen === -1 || !len) {
      return;
    }
    const list = this.$.list;
    const fn = allSelected ? 'selectIndex' : 'deselectIndex';
    if (allSelected) {
      if (selectedLen === len) {
        return;
      }
    } else {
      if (selectedLen === 0) {
        return;
      }
    }
    for (let i = 0; i < len; i++) {
      list[fn](i);
    }
  }
  _computeOptionsTableClass(hasSelection) {
    return hasSelection ? '' : ' inactive';
  }
  /**
   * Informs hosting application to delete currently selected items.
   */
  _deleteSelected() {
    this._closeMenu();
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
    this._closeMenu();
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
  _closeMenu() {
    this.$.listMenu.opened = false;
    this.$.listMenuOptions.selected = -1;
  }
  /**
   * Dispatches the `list-items-search` with current filter value.
   * The event does not bubble.
   */
  _searchList() {
    this.dispatchEvent(new CustomEvent('list-items-search', {
      composed: true,
      detail: {
        q: this.keyword
      }
    }));
  }
  /**
   * Selects / deselected item depends on checkbox state.
   * @param {CustomEvent} e
   */
  _checkboxChange(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    const state = e.currentTarget.checked;
    const model = e.model;
    const index = model.get('index');
    afterNextRender(this, () => {
      if (model.get('selected') !== state) {
        if (state) {
          this.$.list.selectIndex(index);
        } else {
          this.$.list.deselectIndex(index);
        }
      }
    });
  }
  /**
   * Computes value for `empty` property
   * @param {Array<Object>} items
   * @return {Boolean}
   */
  _computeEmpty(items) {
    return !(items && items.length);
  }
}
window.customElements.define(CookiesListItems.is, CookiesListItems);