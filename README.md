# react-hook-bem

A react library implementing the [BEM](http://getbem.com/) Sass concept.

## Usage

```bash
yarn add react-hook-bem

#or
npm install react-hook-bem
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
