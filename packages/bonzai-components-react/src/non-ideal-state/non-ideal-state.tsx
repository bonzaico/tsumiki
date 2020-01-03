import * as React from "react";
import classNames from "classnames";
import { settings } from "../settings";
import { ensureElement } from "../utils";
import "./non-ideal-state.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    header?: React.ReactNode;
    action?: JSX.Element;
    description?: React.ReactChild;
};

const namespace = settings.namespace;

export class NonIdealState extends React.Component<Props> {
    render() {
        const { header, children, action, description } = this.props;
        return (
            <div className={`${namespace}--non-ideal-state`}>
                {header && <h1 className={`${namespace}--non-ideal-state__heading`}>{header}</h1>}
                <div className={`${namespace}--non-ideal-state__message`}>{description && ensureElement(description, "span")}</div>
                {children}
                {action}
            </div>
        );
    }
}
