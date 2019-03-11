/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   cookies-list-items.html
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../paper-checkbox/paper-checkbox.d.ts" />
/// <reference path="../paper-button/paper-button.d.ts" />
/// <reference path="../iron-flex-layout/iron-flex-layout.d.ts" />
/// <reference path="../paper-item/paper-icon-item.d.ts" />
/// <reference path="../paper-item/paper-item-body.d.ts" />
/// <reference path="../paper-input/paper-input.d.ts" />
/// <reference path="../iron-list/iron-list.d.ts" />
/// <reference path="../paper-icon-button/paper-icon-button.d.ts" />
/// <reference path="../paper-listbox/paper-listbox.d.ts" />
/// <reference path="../arc-icons/arc-icons.d.ts" />
/// <reference path="../paper-menu-button/paper-menu-button.d.ts" />

declare namespace UiElements {

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
   */
  class CookiesListItems extends Polymer.Element {

    /**
     * The list of cookie items to render.
     */
    items: any[]|null|undefined;

    /**
     * List of selected items on the list.
     */
    selectedItems: any[]|null|undefined;

    /**
     * If true, the user selected some elements on list. Check the
     * `this.selectedItems` property to check for the selected elements.
     */
    readonly hasSelection: boolean|null|undefined;

    /**
     * True to select / deselect all elements on the list
     */
    allSelected: boolean|null|undefined;

    /**
     * Search query
     */
    keyword: string|null|undefined;

    /**
     * Computed value, true if there's no items to render.
     */
    readonly empty: boolean|null|undefined;
    connectedCallback(): void;
    disconnectedCallback(): void;

    /**
     * Notifies the list about the change. It re-renders the items.
     */
    refresh(): void;
    _sizeChanged(length: any): void;

    /**
     * Computes selection class name for a row of the table.
     */
    _computeRowClass(selected: Boolean|null): String|null;

    /**
     * Dispatches `list-item-details` non bubbling custom event with item data.
     */
    _cookieDetails(e: CustomEvent|null): void;

    /**
     * Computes value for `hasSelection`
     */
    _computeHasSelection(length: Number|null): Boolean|null;

    /**
     * Toggles selection of of all itmes on the list.
     *
     * @param allSelected Current state of the `allSelected` property.
     */
    _toggleSelectAll(allSelected: Boolean|null): void;
    _computeOptionsTableClass(hasSelection: any): any;

    /**
     * Informs hosting application to delete currently selected items.
     */
    _deleteSelected(): void;

    /**
     * Requests to export items to file.
     */
    _onExportSelected(): void;

    /**
     * Closes list menu and resets selection.
     */
    _closeMenu(): void;

    /**
     * Dispatches the `list-items-search` with current filter value.
     * The event does not bubble.
     */
    _searchList(): void;

    /**
     * Selects / deselected item depends on checkbox state.
     */
    _checkboxChange(e: CustomEvent|null): void;

    /**
     * Computes value for `empty` property
     */
    _computeEmpty(items: Array<object|null>|null): Boolean|null;
  }
}

interface HTMLElementTagNameMap {
  "cookies-list-items": UiElements.CookiesListItems;
}
