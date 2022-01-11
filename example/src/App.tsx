/* eslint-disable react/jsx-pascal-case */
import { useState } from "react";
import { $button, $div, Styles } from "react-hook-bem";
import styles from "./App.module.scss";

function App() {
  const [clicked, setClicked] = useState(false);
  const [anotherClicked, setAnotherClicked] = useState(false);

  function onClickAction() {
    setClicked(!clicked);
  }

  function onAnotherClickAction() {
    setAnotherClicked(!anotherClicked);
  }

  return (
    <Styles value={styles}>
      <$div $block="app">
        <$div $element="container">
          <h1>react-hook-bem Example App</h1>
          <p>You can also use standard tags instead of react-hook-bem tags.</p>

          <$button $element="button" onClick={onClickAction}>
            Click here to apply a modifier to element below
          </$button>

          <$button $element="button" onClick={onAnotherClickAction}>
            Click here to apply another modifier to element below
          </$button>
          <$div
            $element="click"
            $modifier={{
              firstModifier: clicked,
              anotherModifier: anotherClicked,
            }}
          >
            Applied modifier when button clicked.
          </$div>
        </$div>
      </$div>
    </Styles>
  );
}

export default App;
