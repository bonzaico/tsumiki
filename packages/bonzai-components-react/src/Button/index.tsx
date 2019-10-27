import * as React from "react";
import classNames from "classnames";

interface Props {
    kind?: "primary" | "secondary",
    children?: React.ReactChildren,
    as?: "button" | "a" | "input",
    disabled?: boolean,
    type?: "button" | "reset" | "submit",
    size?: "small" | "medium" | "large",
    href?: string,
    className?: string
};

// TODO
const prefix = "";


export const Button: React.FunctionComponent<Props> = ({
    kind = "primary",
    children,
    as = "button",
    disabled = false,
    type = "button",
    size = "small",
    href,
    className
}: Props) => {
    const component = href ? "a" : as;
    const buttonClasses = classNames({
        [`${prefix}--btn`]: true,
        [`${prefix}--btn--primary`]: kind === "primary",
        [`${prefix}--btn--secondary`]: kind === "secondary",
        [`${prefix}--btn--disabled`]: disabled,
        [`${prefix}--btn--large`]: size === "large",
        [`${prefix}--btn--medium`]: size === "medium",
        [`${prefix}--btn--small`]: size === "small"
    });
    const buttonProps = {
        className: buttonClasses,
        disabled,
        type
    };
    const anchorProps = {
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
