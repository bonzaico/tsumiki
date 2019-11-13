import * as React from "react";
import classNames from "classnames";
import { settings } from "../settings";
import { debounce } from "../utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    id: string,
    defaultValue?: string,
    placeHolder?: string,
    className?: string,
    leadingIcon?: string,
    trailingIcon?: string,
    clearIcon?: string,
    onTypeEnd?: Function,
    clearSearchTooltip?: string,
    onClear?: Function,
    disabled?: boolean,
    autoSuggest?: boolean,
    suggestions?: string[]
};

interface DefaultProps {
    defaultValue: string
    placeHolder: string,
    clearSearchTooltip: string,
    disabled: boolean,
    clearIcon: string,
    autoSuggest: boolean
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
        clearIcon: "icon-clear",
        autoSuggest: false
    };
    state: State = {
        value: this.props.defaultValue || SearchInput.defaultProps.defaultValue
    };
    typingTimer: number | undefined = undefined;

    onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.persist();
        clearTimeout(this.typingTimer);
        this.typingTimer = (debounce(() => {
            if (typeof this.props.onTypeEnd === "function") {
                const target = e.target as HTMLInputElement;
                this.props.onTypeEnd(target.value.trim());
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
        const {
            id,
            leadingIcon,
            trailingIcon,
            clearIcon,
            className,
            placeHolder,
            onClear,
            autoSuggest,
            suggestions
        } = this.props;
        const { value } = this.state;
        const inputClasses = classNames({
            [`${namespace}--input`]: true,
            [`${this.props.className}`]: className,
            [`${namespace}--input__leadingicon`]: leadingIcon,
            [`${namespace}--input__trailingicon`]: trailingIcon,
        });
        const wrapperClasses = classNames({
            [`${namespace}--input-wrapper ${namespace}--search-wrapper`]: true,
        });
        const leadingIconClasses = classNames({
            [`${namespace}--input-leadingicon`]: true,
            [`${leadingIcon}`]: leadingIcon,
        });
        const trailingIconClasses = classNames({
            [`${namespace}--input-trailingicon`]: true,
            [`${trailingIcon}`]: trailingIcon,
        });

        return (
          <div className={wrapperClasses}>
            <div className={`${namespace}--input-container`}>
                { leadingIcon ? <span className={leadingIconClasses}></span> : null }
                <input
                    id={id}
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
            {
                autoSuggest && suggestions && suggestions.length
                    ? <ul className="dropdown">
                        {
                            suggestions.map(s =>
                                <li className="dropdown--item" key={s}>{s}</li>
                            )
                        }
                    </ul>
                    : null
            }
          </div>
        );
    }
}
