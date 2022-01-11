# react-hook-bem

A react library implementing the [BEM](http://getbem.com/) concept for Sass.

## Features

- Complete implementation of BEM concept including blocks, elements and modifiers.
- Provides easy to use style injection
- Provides easy to use DOM elements prefixed by $
- Wrapper to integrate your own components
- Warnings in developer console when class is missing

## Installation

```bash
yarn add react-hook-bem

#or

npm install react-hook-bem
```

## Basic usage

```typescript
/*
* Component.tsx
*/

// All DOM elements are prefixed by $
import { $div, $main Styles } from "react-hook-bem";

// import styles as module
// https://github.com/css-modules/css-modules
import styles from "./App.module.scss";

// ...

return (
  // inject styles
  <Styles value={styles}>
    // define a BEM block by using $block
    // output: class="app"
    <$main $block="app">
      // define a BEM element by using $element
      // output: class="app__container"
      <$div $element="container">
        // use a BEM modifier by using $modifier, multiple modifiers are possible
        // output:
        // class="app__container__click when  clicked === false
        // class="app__container__click app__container__click--hidden" when clicked === true
        <$div
            $element="click"
            $modifier={{
            hidden: clicked,
            }}
        >
            Hello world!
        </$div>
      </$div>
    </$main>
  </Styles>
);
```

```css
.app {
  background-color: red;

  &__container {
    margin: 0 auto;

    &__click {
      /*! keep - so scss compiles emmpty class */

      &--hidden {
        display: none;
      }
    }
  }
}
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
