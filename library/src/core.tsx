import React, {
    ComponentProps,
    createContext,
    ElementRef,
    ElementType,
    forwardRef,
    ReactElement,
    useContext,
} from "react";

const BEMStylesContext = createContext<Record<string, string>>({});
const BEMPathContext = createContext<string[]>([]);

export const Styles = BEMStylesContext.Provider;

type ComponentPropsWithBEM<ComponentT extends ElementType> = Omit<
    ComponentProps<ComponentT>,
    "$block" | "$element" | "$modifier"
> & {
    $block?: string;
    $element?: string | string[];
    $modifier?: string | string[] | Record<string, boolean>;
};

export function withBEM<ComponentT extends ElementType>(Component: ComponentT) {
    const ComponentWithBEM = forwardRef<
        ElementRef<ComponentT>,
        ComponentPropsWithBEM<ComponentT>
    >(({ $block, $element, $modifier, ...props }, ref): ReactElement => {
        // retrieve context
        const styles = useContext(BEMStylesContext);
        let path = useContext(BEMPathContext);

        // shortcut in case on BEM instructions are given
        if (!$block && !$element && !$modifier) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return <Component ref={ref} {...(props as any)} />;
        }

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

        // add given class names
        let classNames: string[] = [];
        if (typeof props.className === "string") {
            classNames.push(props.className);
        }

        // add block or element name
        if (path.length > 0) {
            classNames.push(path.join("__"));
        }

        // add modifier
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

        // translate class names
        if (styles) {
            classNames = classNames.map((className) => {
                if (styles[className]) {
                    return styles[className];
                }
                console.warn(`css class ${className} not found`);
                return className;
            });
        }

        // render context and inner component
        return (
            <BEMPathContext.Provider value={path}>
                <Component
                    ref={ref}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    {...(props as any)}
                    className={classNames.join(" ")}
                />
            </BEMPathContext.Provider>
        );
    });

    ComponentWithBEM.displayName = `withBEM(${
        typeof Component === "string"
            ? Component
            : // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (Component as any).displayName || Component.name || "Component"
    })`;

    return ComponentWithBEM;
}
