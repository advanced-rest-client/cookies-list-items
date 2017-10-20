[![Build Status](https://travis-ci.org/advanced-rest-client/cookies-list-items.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/cookies-list-items)  

# cookies-list-items

`<cookies-list-items>` An element to display a list of cookies

## Data model
Each cookie item requires following properties:
-   `name` (String) Cookie name
-   `value` (String) Cookie value
-   `domain` (String) Cookie domain
-   `path` (String) Cookie path.


### Example

```
<cookies-list-items items="[[cookies]]"></cookies-list-items>
```

## List handling

The element uses `<iron-list>` element that creates a virtual list containing
limited number of child elements. It allows to load huge number of requests
without influencing the performance.

### Styling
`<cookies-list-items>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--cookies-list-items` | Mixin applied to the element | `{}`
`--action-button` | Mixin apllied to the primary action buttons | `{}`
`--secondary-action-button-color` | Color of the secondary action button | `--primary-color`
`--arc-font-body1` | Mixin applied to the element | `{}`
`--cookies-list-item` | Mixin applied to each list item | `{}`
`--cookies-list-item-selected` | Mixin applied to the selected list item | `{}`
`--cookies-list-item-selected-background-color` | Selection color for list items. | `#E0E0E0`
`--cookies-list-items-search-input` | Mixin applied to the search input | `{}`
`--cookies-list-items-header` | Mixin applied to the list header options section. | `{}`
`--cookies-list-items-list` | Mixin applied to the list (`iron-list`) | `{}`
`--cookies-list-item-value` | Mixin applied to cookie value label | `{}`
`--cookies-list-item-name` |  Mixin applied to cookie name label. Note that name label is a child of value container. | `{}`
`--cookies-list-item-url-color` | Color of the cookie domain and path labels | `rgba(0, 0, 0, 0.54)`

