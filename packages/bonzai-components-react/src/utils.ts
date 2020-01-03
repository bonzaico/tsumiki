import * as React from "react";

export const debounce = (func: Function, wait: number, immediate?: boolean) => {
    let timeout: number | undefined;
    return function (this: object | void) {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = undefined;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        window.clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
        if (callNow) func.apply(context, args);
        return timeout;
    };
}

/**
 * Converts a React node to an element: non-empty string or number or
 * `React.Fragment` (React 16.3+) is wrapped in given tag name; empty strings
 * and booleans are discarded.
 */
export function ensureElement(child: React.ReactNode | undefined, tagName: keyof JSX.IntrinsicElements = "span") {
    if (child == null || typeof child === "boolean") {
        return undefined;
    } else if (typeof child === "string") {
        // cull whitespace strings
        return child.trim().length > 0 ? React.createElement(tagName, {}, child) : undefined;
    } else if (typeof child === "number" || typeof (child as any).type === "symbol" || Array.isArray(child)) {
        // React.Fragment has a symbol type, ReactNodeArray extends from Array
        return React.createElement(tagName, {}, child);
    } else if (isReactElement(child)) {
        return child;
    } else {
        // child is inferred as {}
        return undefined;
    }
}

export function isReactElement<T = any>(child: React.ReactNode): child is React.ReactElement<T> {
    return (
        typeof child === "object" &&
        typeof (child as any).type !== "undefined" &&
        typeof (child as any).props !== "undefined"
    );
}
