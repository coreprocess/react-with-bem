# react-hook-bem

A react library implementing the [BEM](http://getbem.com/) concept for Sass.

## Features

- Complete implementation of BEM concept including blocks, elements and modifiers.
- Provides easy to use style injection
- Provides easy to use DOM elements prefixed by $
- Wrapper to integrate your own components

## Installation

```bash
yarn add react-hook-bem

#or
npm install react-hook-bem
```

## Basic usage

```typescript
// All DOM elements are prefixed by $
import { $div, Styles } from "react-hook-bem";

// import scss module
// https://github.com/css-modules/css-modules
import styles from "./App.module.scss";

// ...

return (
  // inject styles
  <Styles value={styles}>
    // define a BEM block by using $block
    <$div $block="app">
      // define a BEM element by using $element
      <$div $element="container"></$div>
      // use a BEM modifier by using $modifier, multiple modifiers are possible
      <$div
        $element="click"
        $modifier={{
          hidden: clicked,
        }}
      >
        Hello world!
      </$div>
    </$div>
  </Styles>
);
```

### Advanced usage

You can wrap your own components with the provided `withBEM` wrapper:

```typescript
import { YourComponent } from "./YourComponent";
import { withBEM } from "react-hooks-bem";

export const $YourComponent = withBEM(YourComponent);
```

## Example

You can find a complete example in `./example`.

## Development

```bash
# Step 1:
# in project root
yarn install

# Step 2:
# in project root
cd example

yarn install

# Step 3:
# in project root
# See: https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
cd example/node_modules/react

yarn link

# in project root
yarn link "react"

# Step 4
# Build library
# in project root
yarn build

# Step 5
# Start example app
cd example

yarn start
```

## Authors

- Niklas Salmoukas - [@coreprocess](https://github.com/coreprocess) - Digital Entities
- Lukas Kupczyk - [@lukaskupczyk](https://github.com/lukaskupczyk) - Digital Entities
