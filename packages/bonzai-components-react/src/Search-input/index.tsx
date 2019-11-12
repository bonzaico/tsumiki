import * as React from "react";
import classNames from "classnames";
import { settings } from "../settings";
import { debounce } from "../utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    defaultValue?: string,
    placeHolder?: string,
    className?: string,
    leadingIcon?: string,
    trailingIcon?: string,
    clearIcon?: string,
    onTypeEnd?: Function,
    clearSearchTooltip?: string,
    onClear?: Function,    
    disabled?: boolean
};

interface DefaultProps {
    defaultValue: string
    placeHolder: string,
    clearSearchTooltip: string,
    disabled: boolean,
    clearIcon: string
}

interface State {
    value: string
};

const namespace = settings.namespace;

export class SearchInput extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        defaultValue: "",
        placeHolder: "Enter search text",
        clearSearchTooltip: "Clear search",
        disabled: false,
        clearIcon: "icon-clear"
    };
    state: State = {
        value: this.props.defaultValue || ""
    };
    typingTimer: number | undefined = undefined;

    onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.persist();
        clearTimeout(this.typingTimer);
        this.typingTimer = (debounce(() => {
            if (typeof this.props.onTypeEnd === "function") {
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
        let searchValue = target.value;
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
        const { leadingIcon, trailingIcon, clearIcon, className, placeHolder, onClear } = this.props;
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
            {typeof onClear === "function"
                && this.state.value != ""
                ? <span
                        data-tip={this.props.clearSearchTooltip}
                        className={`clear-search ${clearIcon}`}
                        onClick={e => {
                            if (typeof this.props.onClear === "function") {
                                this.props.onClear(e);
                            }
                        }}
                    ></span>
                : null}
          </div>
        );
    }
}
