import * as React from "react";
import classNames from "classnames";
import { settings } from "../settings";
import "./loader.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
    description?: string
};

const namespace = settings.namespace;

export class Loader extends React.Component<Props> {
    render() {
        const { className, description } = this.props;
        return (
            <div className={`${namespace}--loader ${className}`}>
                <div className={`${namespace}--loader--circular`}/>
                {description ?
                    <label className={`${namespace}--loader--text`}>{description}</label>
                : null}
            </div>
        );
    }
}
