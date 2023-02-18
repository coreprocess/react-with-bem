import React from "react";
import {
    Children,
    cloneElement,
    isValidElement,
    PropsWithChildren,
    ReactNode,
    ReactPortal,
    ReactElement,
} from "react";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace React {
        interface Attributes {
            $block?: string;
            $element?: string | string[];
            $modifier?: string | string[] | Record<string, boolean>;
        }
    }
}

export type Styles = Record<string, string>;

function mapChild(
    child: ReactPortal | ReactElement,
    styles: Styles | undefined,
    path: string[]
): ReactPortal | ReactElement {
    // extract BEM properties
    const {
        $block,
        $element,
        $modifier,
    }: {
        $block?: JSX.IntrinsicAttributes["$block"];
        $element?: JSX.IntrinsicAttributes["$element"];
        $modifier?: JSX.IntrinsicAttributes["$modifier"];
    } = child.props;

    // extract class name and children
    let {
        className,
        children,
    }: {
        className?: string;
        children?: ReactNode;
    } = child.props;

    // shortcut
    if (
        $block === undefined &&
        $element === undefined &&
        $modifier === undefined &&
        Children.count(children) === 0
    ) {
        return child;
    }

    // handle BEM properties and construct class names
    if (
        $block !== undefined ||
        $element !== undefined ||
        $modifier !== undefined
    ) {
        // resolve block
        if ($block) {
            path = [$block];
        }

        // resolve elements
        if ($element) {
            for (let elements of typeof $element === "string"
                ? [$element]
                : $element) {
                // process leading dots
                let level = 0;
                while (elements.startsWith(".")) {
                    level += 1;
                    elements = elements.substr(1);
                }
                level = Math.max(level - 1, 0);
                path = path.slice(0, path.length - level);
                // extends path
                path = [...path, ...elements.split(".")];
            }
        }

        // contruct block or element class name
        let classNames: (string | undefined)[] = [];
        if (path.length > 0) {
            classNames.push(path.join("__"));
        }

        // construct modifier class name
        if ($modifier) {
            // determine all modifiers
            let modifiers: string[] = [];
            if (typeof $modifier === "string") {
                modifiers = $modifier.split(",");
            } else if (Array.isArray($modifier)) {
                modifiers = $modifier;
            } else {
                modifiers = Object.entries($modifier)
                    .filter(([, test]) => test)
                    .map(([name]) => name);
            }

            // add modifier as class name
            for (const modifier of modifiers) {
                classNames.push(`${path.join("__")}--${modifier}`);
            }
        }

        // translate class names if style map is given
        if (styles) {
            classNames = classNames.map((className) => {
                if (typeof className === "string" && styles[className]) {
                    return styles[className];
                }
            });
        }

        // construct class name
        className =
            [className, ...classNames].filter((name) => !!name).join(" ") ||
            undefined;
    }

    // map children
    if (children) {
        children = mapChildren(children, styles, path);
    }

    // clone element
    const cloned = cloneElement(child, {
        // remove BEM properties
        ...($block !== undefined ? { $block: undefined } : {}),
        ...($element !== undefined ? { $element: undefined } : {}),
        ...($modifier !== undefined ? { $modifier: undefined } : {}),
        // update class name and children
        className,
        children,
    });

    // return cloned element
    return cloned;
}

function mapChildren(
    children: ReactNode,
    styles: Styles | undefined,
    path: string[]
): ReactNode {
    // map children
    return Children.map(children, (child) => {
        if (isValidElement(child)) {
            return mapChild(child, styles, path);
        }
        return child;
    });
}

export function BEM({
    children,
    styles,
}: PropsWithChildren<{ styles?: Styles }>) {
    // map children
    children = mapChildren(children, styles, []);
    // wrap in fragment
    return <>{children}</>;
}
