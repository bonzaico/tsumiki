import * as React from "react";
import classNames from "classnames";
import { settings } from "../settings";
import { debounce } from "../utils";
import { Button } from "../button/button";
import "./search-input.scss";
import { bem } from "../bem";
import onClickOutside from "react-onclickoutside";

const MODULE_BEM_BASE = "bz--search-wrapper";
const bemE = bem.e(MODULE_BEM_BASE);
const bemM = bem.m(MODULE_BEM_BASE);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    defaultValue?: string;
    placeHolder?: string;
    className?: string;
    leadingIcon?: string;
    trailingIcon?: string;
    showButton?: boolean;
    buttonContent?: JSX.Element;
    clearIcon?: string;
    onTypeEnd?: Function;
    clearSearchTooltip?: string;
    onClear?: Function;
    disabled?: boolean;
    autoSuggest?: boolean;
    suggestions?: string[];
    onSearch?: Function;
    onButtonClick?: Function;
    onFocusEvent?: Function;
    large?: Boolean;
    minimal?: Boolean;
    onChangeEvent?: Function;
    value?: string;
}

interface DefaultProps {
    defaultValue: string;
    placeHolder: string;
    clearSearchTooltip: string;
    disabled: boolean;
    clearIcon: string;
    autoSuggest: boolean;
}

interface State {
    value: string;
    outsideClick: boolean;
    keydown: number;
}

const namespace = settings.namespace;

class SearchInputComponent extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        defaultValue: "",
        placeHolder: "Enter search text",
        clearSearchTooltip: "Clear search",
        disabled: false,
        clearIcon: "icon-clear",
        autoSuggest: false
    };
    state: State = {
        value:
            this.props.defaultValue ||
            SearchInputComponent.defaultProps.defaultValue,
        outsideClick: false,
        keydown: 0
    };
    typingTimer: number | undefined = undefined;

    onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.persist();
        clearTimeout(this.typingTimer);
        this.typingTimer = debounce(() => {
            if (typeof this.props.onTypeEnd === "function") {
                const target = e.target as HTMLInputElement;
                this.props.onTypeEnd(target.value.trim(), e);
            }
        }, 500)();
    };

    onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        window.clearTimeout(this.typingTimer);
        if (typeof this.props.onKeyDown === "function") {
            this.props.onKeyDown(e);
        }

        const suggestions = this.props.suggestions
            ? this.props.suggestions
            : [];
        const key = this.state.keydown;

        if (e.keyCode === 40) {
            this.setState({
                keydown: suggestions.length <= key ? 1 : this.state.keydown + 1
            });
        }

        if (e.keyCode === 38) {
            this.setState({
                keydown:    key > suggestions.length || key === 0 ? suggestions.length : this.state.keydown - 1
            });
        }

        if (e.keyCode === 27) {
            this.handleClickOutside();
        }

        if (e.key === "Enter" && typeof this.props.onSearch === "function") {
            if (suggestions.length > 0 && this.state.keydown !== 0) {
                this.props.onSearch(
                    e,
                    suggestions ? suggestions[this.state.keydown - 1] : null
                );
                this.handleClickOutside();
            } else {
                let searchTerm = (e.target as HTMLInputElement).value;
                this.props.onSearch(e, searchTerm);
            }
        }
    };

    onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        window.clearTimeout(this.typingTimer);
        if (typeof this.props.onBlur === "function") {
            this.props.onBlur(e);
        }
    };

    handleClickOutside = () => {
        this.setState({ outsideClick: true });
    };

    onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        window.clearTimeout(this.typingTimer);
        if (typeof this.props.onFocusEvent === "function") {
            this.props.onFocusEvent(e);
        }
    };

    onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        let searchValue = target.value;
        e.persist();
        window.clearTimeout(this.typingTimer);
        this.setState({
            value: searchValue,
            outsideClick: false
        });
        if (typeof this.props.onChangeEvent === "function") {
            this.props.onChangeEvent(searchValue);
        }
    };

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            });
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
            buttonContent,
            minimal,
            large
        } = this.props;
        const { value } = this.state;
        const suggestion = this.state.outsideClick ? 0 : suggestions;
        const a = autoSuggest && suggestion && suggestion.length ? "active":'';
        const inputClasses = classNames({
            [`${namespace}--input`]: true,
            [`${this.props.className}`]: className,
            [`${namespace}--input__leadingicon`]: leadingIcon,
            [`${namespace}--input__trailingicon`]: trailingIcon
        });
        const wrapperClasses = classNames({
            [`${namespace}--input-wrapper ${namespace}--search-wrapper`]: true,
            [minimal ? `${bemM("minimal")}` : ""]: true,
            [large ? `${bemM("large")}` : ""]: true
        });
        const leadingIconClasses = classNames({
            [`${namespace}--input-leadingicon`]: true,
            [`${leadingIcon}`]: leadingIcon
        });
        const trailingIconClasses = classNames({
            [`${namespace}--input-trailingicon`]: true,
            [`${trailingIcon}`]: trailingIcon
        });
        const buttonClass = classNames({
            [`${namespace}--input-trailingicon ${namespace}--trailingbutton`]: true,
            [`${bemE("button")}`]: true
        });
        const selected = classNames({
            [`${namespace}--selected`]: true
        });

        const buttonContentjsx = buttonContent ? (
            buttonContent
        ) : (
            <i className="icon-search"></i>
        );

        return (
            <div className={wrapperClasses}>
                <div className={`${namespace}--input-container ${a}`}>
                    {leadingIcon ? (
                        <label
                            htmlFor={id}
                            className={leadingIconClasses}
                        ></label>
                    ) : null}
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
                        onFocus={this.onFocus}
                    ></input>
                    {showButton ? (
                        <Button
                            onClick={e => {
                                if (
                                    typeof this.props.onButtonClick ===
                                    "function"
                                ) {
                                    this.props.onButtonClick(
                                        e,
                                        this.state.value
                                    );
                                }

                                if (typeof this.props.onSearch === "function") {
                                    this.props.onSearch(e, this.state.value);
                                }
                            }}
                            kind="tertiary"
                            className={buttonClass}
                        >
                            {buttonContentjsx}
                        </Button>
                    ) : trailingIcon ? (
                        <label
                            htmlFor={id}
                            className={trailingIconClasses}
                        ></label>
                    ) : null}
                </div>
                {typeof onClear === "function" && this.state.value != "" ? (
                    <span
                        data-tip={this.props.clearSearchTooltip}
                        className={`clear-search ${clearIcon}`}
                        onClick={e => {
                            if (typeof this.props.onClear === "function") {
                                this.props.onClear(e);
                            }
                        }}
                    ></span>
                ) : null}
                {autoSuggest && suggestion && suggestion.length ? (
                    <ul className="dropdown">
                        {suggestion.map((s, index) => (
                            <li
                                className={`dropdown--item ${
                                    index + 1 === this.state.keydown
                                        ? selected
                                        : ""
                                }`}
                                key={s}
                                onClick={e => {
                                    if (
                                        typeof this.props.onSearch ===
                                        "function"
                                    ) {
                                        this.props.onSearch(e, s);
                                        this.handleClickOutside();
                                    }
                                }}
                            >
                                {s}
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        );
    }
}

export const SearchInput = onClickOutside(SearchInputComponent);
