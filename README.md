# withBEM()

![npm version](https://badgen.net/npm/v/react-with-bem?icon=npm&label)
![GitHub checks](https://badgen.net/github/checks/teamrevin/react-with-bem/publish?icon=github&label=GitHub)

`withBEM()` implements the [BEM](http://getbem.com/) methodology for React.

## Installation

Use your favourite manager to install the [package](https://www.npmjs.com/package/react-with-bem):

```sh
yarn add react-with-bem
```

```sh
npm install react-with-bem --save
```

## Usage

```typescript
import { BEM } from "react-with-bem";

// import styles as module (https://github.com/css-modules/css-modules)
import styles from "./App.module.scss";

// render
return (
  // activate BEM and inject styles
  <BEM styles={styles}>
    // set BEM block by using $block
    // output: <main class="app">
    <main $block="app">
      // set a BEM element by using $element
      // output: <div class="app__container">
      <div $element="container">
        // set BEM modifier by using $modifier (multiple modifiers are possible)
        // output:
        // <div class="app__container__click> when  clicked === false
        // <div class="app__container__click app__container__click--hidden"> when clicked === true
        <div
            $element="click"
            $modifier={{
              hidden: clicked,
            }}
        >
            Hello world!
        </div>
      </div>
    </main>
  </BEM>
);
```

```css
.app {
    background-color: red;

    &__container {
        margin: 0 auto;

        &__click {
            &--hidden {
                display: none;
            }
        }
    }
}
```

## Example

You can find a complete example [here](example).
