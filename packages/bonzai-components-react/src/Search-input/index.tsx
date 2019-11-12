import * as React from "react";
import classNames from "classnames";
import { settings } from "../settings";
import { debounce } from "../utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    value: string,
    placeHolder?: string,
    className?: string,
    leadingIcon?: string,
    trailingIcon?: string,
    onTypeEnd?: Function,
    clearSearchTooltip?: string,
    onClear?: Function,
    disabled?: boolean
};

interface DefaultProps {
    placeHolder: string,
    clearSearchTooltip: string,
    disabled: boolean
}

interface State {
    value: string
};

const namespace = settings.namespace;

export class SearchInput extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        placeHolder: "Enter search text",
        clearSearchTooltip: "Clear search",
        disabled: false
    };
    state: State = {
        value: this.props.value
    };
    typingTimer: number | undefined = undefined;

    onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.persist();
        clearTimeout(this.typingTimer);
        this.typingTimer = (debounce(() => {
            if (typeof this.props.onTypeEnd !== "undefined") {
                this.props.onTypeEnd(e);
            }
        }, 500))();
    }

    onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        window.clearTimeout(this.typingTimer);
        if (typeof this.props.onKeyDown === "function") {
            this.props.onKeyDown(e);
        }
    };

    onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        window.clearTimeout(this.typingTimer);
        if (typeof this.props.onBlur === "function") {
            this.props.onBlur(e);
        }
    }

    onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        let searchValue = target.value.trim();
        e.persist();
        window.clearTimeout(this.typingTimer);
        this.setState({
            value: searchValue
        });
        if (typeof this.props.onChange === "function") {
            this.props.onChange(e);
        }
    }

    render() {
        const { leadingIcon, trailingIcon, className, placeHolder, onClear } = this.props;
        const { value } = this.state;
        const inputClasses = classNames({
            [`${namespace}--input`]: true,
            [`${this.props.className}`]: className
        });
        const wrapperClasses = classNames({
            [`${namespace}--input-wrapper`]: true,
        });
        const leadingIconClasses = classNames({
            [`${namespace}--input--leadingicon`]: true,
            [`${leadingIcon}`]: leadingIcon,
        });
        const trailingIconClasses = classNames({
            [`${namespace}--input--trailingicon`]: true,
            [`${trailingIcon}`]: trailingIcon,
        });

        return (
          <div className={wrapperClasses}>
            <div className={`${namespace}--input-container`}>
                { leadingIcon ? <span className={leadingIconClasses}></span> : null }
                <input
                    type="text"
                    className={inputClasses}
                    placeholder={placeHolder}
                    value={value}
                    onKeyDown={this.onKeyDown}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onKeyUp={this.onKeyUp}
                ></input>
                { trailingIcon ? <span className={trailingIconClasses}></span> : null }
            </div>
            {typeof this.props.onClear === "function"
                && this.props.value != ""
                ? <span
                        data-tip={this.props.clearSearchTooltip}
                        className="clear-search"
                        onClick={e => {
                            if (typeof this.props.onClear === "function") {
                                this.props.onClear(e);
                            }
                        }}
                    >
                        <i className="icon-clear" />
                    </span>
                : null}
          </div>
        );
    }
}
