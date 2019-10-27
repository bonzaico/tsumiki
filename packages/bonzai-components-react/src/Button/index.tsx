import * as React from "react";
import classNames from "classnames";
import { settings } from "../settings";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    kind?: "primary" | "secondary",
    children?: React.ReactNode,
    as?: "button" | "a" | "input",
    disabled?: boolean,
    type?: "button" | "reset" | "submit",
    size?: "small" | "medium" | "large",
    href?: string,
    className?: string
};

const namespace = settings.namespace;


export const Button: React.FunctionComponent<Props> = ({
    kind = "primary",
    children,
    as = "button",
    disabled = false,
    type = "button",
    size = "medium",
    href,
    className,
    ...other
}: Props) => {
    const component = href ? "a" : as;
    const buttonClasses = classNames({
        [`${namespace}--btn`]: true,
        [`${namespace}--btn--primary`]: kind === "primary",
        [`${namespace}--btn--secondary`]: kind === "secondary",
        [`${namespace}--btn--disabled`]: disabled,
        [`${namespace}--btn--large`]: size === "large",
        [`${namespace}--btn--medium`]: size === "medium",
        [`${namespace}--btn--small`]: size === "small"
    });
    const buttonProps = {
        ...other,
        className: buttonClasses,
        disabled,
        type
    };
    const anchorProps = {
        ...other,
        className: buttonClasses,
        href
    };

    return href ?
        <a {...anchorProps}>{children}</a> :
        React.createElement(
            component,
            buttonProps,
            children
        )
};
