import React, { useState } from "react";
import { $button, $div, Styles } from "react-with-bem";
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
                    <h1>withBEM Example App</h1>

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
