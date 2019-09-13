[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/cookies-list-items.svg)](https://www.npmjs.com/package/@advanced-rest-client/cookies-list-items)

[![Build Status](https://travis-ci.org/advanced-rest-client/cookies-list-items.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/cookies-list-items)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/cookies-list-items)

## &lt;cookies-list-items&gt;

A component to render a list of cookies.

## Usage

### Installation
```
npm install --save @advanced-rest-client/cookies-list-items
```

### In a LitElement

```js
import { LitElement, html } from 'lit-element';
import '@advanced-rest-client/arc-menu/cookies-list-items.js';

class SampleElement extends LitElement {

  render() {
    return html`
    <cookies-list-items
      ?compatibility="${this.compatibility}"
      ?outlined="${this.outlined}"
      .listType="${this.listType}"
      .items="${this.cookies}"
      @list-items-delete="${this._onDelete}"
      @list-items-export="${this._onExport}"
      @list-items-search="${this._onSearch}"
      @list-item-details="${this._onDetails}"
    ></cookies-list-items>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```


## Development

```sh
git clone https://github.com/advanced-rest-client/cookies-list-items
cd cookies-list-items
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests
```sh
npm test
```

## API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)
