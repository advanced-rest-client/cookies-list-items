[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/cookies-list-items.svg)](https://www.npmjs.com/package/@advanced-rest-client/cookies-list-items)

[![Build Status](https://travis-ci.org/advanced-rest-client/cookies-list-items.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/cookies-list-items)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/cookies-list-items)

## &lt;cookies-list-items&gt;

A component to render a list of cookies.

```html
<cookies-list-items></cookies-list-items>
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/cookies-list-items
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/cookies-list-items/cookies-list-items.js';
    </script>
  </head>
  <body>
    <cookies-list-items></cookies-list-items>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from '@polymer/polymer';
import '@advanced-rest-client/cookies-list-items/cookies-list-items.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <cookies-list-items></cookies-list-items>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/cookies-list-items
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
