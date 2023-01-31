# withBEM()

![npm version](https://badgen.net/npm/v/react-with-bem?icon=npm&label)
![GitHub checks](https://badgen.net/github/checks/teamrevin/react-with-bem/publish?icon=github&label=GitHub)

`withBEM()` implements the [BEM](http://getbem.com/) methodology for React in the form of a higher-order component.

## Features

-   Complete implementation of BEM methodology, including blocks, elements, and modifiers
-   All intrinsic elements prefixed with $
-   Higher-order component to BEM-enable your own components
-   Warning in the developer console when CSS class is missing

## Installation

Use your favourite manager to install the [package](https://www.npmjs.com/package/react-with-bem):

```sh
yarn add react-with-bem
```

```sh
npm install react-with-bem --save
```

## BEM-enabled intrinsic elements

```typescript
// BEM-enabled intrinsic elements are prefixed with $
import { $div, $main, Styles } from "react-with-bem";

// import styles as module (https://github.com/css-modules/css-modules)
import styles from "./App.module.scss";

// render
return (
  // inject styles
  <Styles value={styles}>
    // set BEM block by using $block
    // output: <main class="app">
    <$main $block="app">
      // set a BEM element by using $element
      // output: <div class="app__container">
      <$div $element="container">
        // set BEM modifier by using $modifier (multiple modifiers are possible)
        // output:
        // <div class="app__container__click> when  clicked === false
        // <div class="app__container__click app__container__click--hidden"> when clicked === true
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
            /*! keep - so scss compiles empty class */

            &--hidden {
                display: none;
            }
        }
    }
}
```

## Higher-order component

You can wrap your own components with the provided `withBEM` higher-order component:

```typescript
import { YourComponent } from "./YourComponent";
import { withBEM } from "react-with-bem";

export const $YourComponent = withBEM(YourComponent);
```

## Example

You can find a complete example [here](example).
