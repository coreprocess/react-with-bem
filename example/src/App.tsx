import React, { Component, useCallback, useState } from "react";
import { BEM } from "react-with-bem";
import styles from "./App.module.scss";

class AnotherActionComponent extends Component<{
    className?: string;
    onClick: () => void;
}> {
    render() {
        const { className, onClick } = this.props;
        return (
            <button className={className} onClick={onClick}>
                Click here to apply another modifier to element below
            </button>
        );
    }
}

function ResultComponent({ className }: { className?: string }) {
    return (
        <div className={className}>Applied modifier when button clicked.</div>
    );
}

export function App() {
    const [clicked, setClicked] = useState(false);
    const [anotherClicked, setAnotherClicked] = useState(false);

    const onClickAction = useCallback(() => {
        setClicked(!clicked);
    }, [setClicked, clicked]);

    const onAnotherClickAction = useCallback(() => {
        setAnotherClicked(!anotherClicked);
    }, [setAnotherClicked, anotherClicked]);

    return (
        <BEM styles={styles}>
            <div $block="app">
                <div $element="container">
                    <h1>withBEM Example App</h1>

                    <button $element="button" onClick={onClickAction}>
                        Click here to apply a modifier to element below
                    </button>

                    {/* works with class components */}
                    <AnotherActionComponent
                        $element="button"
                        onClick={onAnotherClickAction}
                    />

                    {/* works with function components */}
                    <ResultComponent
                        $element="click"
                        $modifier={{
                            firstModifier: clicked,
                            anotherModifier: anotherClicked,
                        }}
                    />
                </div>
            </div>
        </BEM>
    );
}
