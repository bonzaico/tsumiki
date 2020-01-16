import * as React from "react";
import classNames from "classnames";
import { settings } from "../settings";
import { debounce } from "../utils";
import { Button } from "../button/button";
import "./search-input.scss";
import {bem} from "../bem"

const MODULE_BEM_BASE = "bz--search-wrapper";
const bemE = bem.e(MODULE_BEM_BASE);
const bemM = bem.m(MODULE_BEM_BASE);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    id: string,
    defaultValue?: string,
    placeHolder?: string,
    className?: string,
    leadingIcon?: string,
    trailingIcon?: string,
    showButton?:boolean,
    buttonContent?: JSX.Element,
    clearIcon?: string,
    onTypeEnd?: Function,
    clearSearchTooltip?: string,
    onClear?: Function,
    disabled?: boolean,
    autoSuggest?: boolean,
    suggestions?: string[],
    onSearch?: Function,
    onButtonClick?: Function
    onFocusEvent?: Function
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
        if (e.key === "Enter" && typeof this.props.onSearch === "function") {
            let searchTerm = (e.target as HTMLInputElement).value;
            this.props.onSearch(e, searchTerm);
        }
    };

    onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        window.clearTimeout(this.typingTimer);
        if (typeof this.props.onBlur === "function") {
            this.props.onBlur(e);
        }
    }

    onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        window.clearTimeout(this.typingTimer);
        if (typeof this.props.onFocusEvent === "function") {
            this.props.onFocusEvent(e);
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
            suggestions,
            showButton,
            buttonContent
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
        const buttonClass = classNames({
            [`${namespace}--input-trailingicon ${namespace}--trailingbutton`]: true,
            [`${bemE("button")}`]: true
        });

        const buttonContentjsx = buttonContent ? buttonContent : <i className="icon-search"></i> 

        return (
          <div className={wrapperClasses}>
            <div className={`${namespace}--input-container`}>
                { leadingIcon ? <label htmlFor={id} className={leadingIconClasses}></label> : null }
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
                    onFocus = {this.onFocus}
                ></input>
                { showButton ? <Button 
                    onClick={e => {
                        if (typeof this.props.onButtonClick === "function") {
                            this.props.onButtonClick(e , this.state.value);
                        }
                        
                        if (typeof this.props.onSearch === "function") {
                                this.props.onSearch(e, this.state.value);
                        }
                        
                    }}
                kind="tertiary" className={buttonClass}>{buttonContentjsx}</Button> : trailingIcon ? <label htmlFor={id} className={trailingIconClasses}></label> : null }
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
