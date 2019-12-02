import * as React from "react";
import classNames from "classnames";
import { settings } from "../settings";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    kind?: "grey" | "green" | "blue" | "yellow" | "red",
    content: string,
    className?: string
};

const namespace = settings.namespace;

export const Tag: React.FunctionComponent<Props> = ({
    kind = "grey",
    content,
    className,
    ...other
}: Props) => {
    const tagClasses = classNames({
        [`${namespace}--tag`]: true,
        [`${namespace}--tag--grey`]: kind === "grey",
        [`${namespace}--tag--green`]: kind === "green",
        [`${namespace}--tag--blue`]: kind === "blue",
        [`${namespace}--tag--yellow`]: kind === "yellow",
        [`${namespace}--tag--red`]: kind === "red",
        [`${className}`]: className
    });
    const tagProps = {
        className: tagClasses,
        ...other
    };
    return React.createElement(
        "div",
        tagProps,
        content
    );
};
