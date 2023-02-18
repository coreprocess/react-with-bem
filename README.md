# React with BEM

![npm version](https://badgen.net/npm/v/react-with-bem?icon=npm&label)
![GitHub checks](https://badgen.net/github/checks/teamrevin/react-with-bem/publish?icon=github&label=GitHub)

`react-with-bem` implements the [BEM](http://getbem.com/) methodology for React.

## Installation

Use your favourite manager to install the [package](https://www.npmjs.com/package/react-with-bem):

```sh
yarn add react-with-bem
```

```sh
npm install react-with-bem --save
```

## Usage

```tsx
import React from "react";
import { BEM } from "react-with-bem";

// import styles as module
// https://github.com/css-modules/css-modules
import styles from "./App.module.scss";

// use BEM annotations whenever applicable
export function App() {
    return (
        // activate BEM and inject styles
        <BEM styles={styles}>
            {
                // set BEM block by using $block
                // output: <main class="app">
            }
            <main $block="app">
                {
                    // set a BEM element by using $element
                    // output: <div class="app__container">
                }
                <div $element="container">
                    {
                        // set BEM modifier by using $modifier (multiple modifiers are possible)
                        // output:
                        //     <div class="app__container__hello> when emphasized === false
                        //     <div class="app__container__hello app__container__hello--emphasized"> when emphasized === true
                    }
                    <div
                        $element="hello"
                        $modifier={{
                            emphasized: true,
                        }}
                    >
                        Hello World!
                    </div>
                </div>
            </main>
        </BEM>
    );
}
```

```scss
.app {
    background-color: red;
    color: white;

    &__container {
        max-width: fit-content;
        margin: 0 auto;

        &__hello {
            font-size: 2rem;

            &--emphasized {
                font-weight: bold;
            }
        }
    }
}
```

## ESLint

Please add the following rule to your ESLint configuration to suppress errors related to the `$block`, `$element`, and `$modifier` attributes.

```json
{
    "rules": {
        "react/no-unknown-property": [
            2,
            { "ignore": ["$block", "$element", "$modifier"] }
        ]
    }
}
```

## Example

You can find a complete example [here](example).
