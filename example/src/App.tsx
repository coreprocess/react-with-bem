import styles from "./App.module.scss";
import { $div, Styles } from "react-hook-bem";

function App() {
  return (
    <Styles value={styles}>
      <$div $block="app">
        <$div $element="container">react-hook-bem Example App</$div>
      </$div>
    </Styles>
  );
}

export default App;
