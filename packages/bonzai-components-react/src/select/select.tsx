import * as React from "react";
import classNames from "classnames";
import { settings } from "../settings";
import Fuse from "fuse.js";
import { bem } from '../bem';
import "./select.scss";

interface Option {
    label: string;
    value: string;
    options?: Array<Option>;
}

interface Props extends React.HTMLAttributes<HTMLSelectElement> {
    options: Array<Option>;
    className?: string;
    alwaysShowSearch: boolean;
    value: string;
    placeholder: string;
    multiple: boolean;
    name: string;
    autoComplete: "on" | "off";
    onSelection?: ((option: Option) => void),
    renderOption: Function;
    renderGroupHeader: Function;
    renderValue: Function;
}

interface State {
    value: string,
    searchTerm: string,
    focus: boolean,
    filteredOptions: Array<Option>,
    highlighted: number | null
};

const namespace = settings.namespace;
const bemE = bem.e(`${namespace}--select`);
const bemM = bem.e(`${namespace}--select`);

export class Select extends React.Component<Props, State> {
    showSearch: boolean;
    search: HTMLInputElement | null;
    container: HTMLDivElement | null;
    valueInput: HTMLInputElement | null;
    select: HTMLDivElement | null;


    static defaultProps: Props = {
        options: [],
        alwaysShowSearch: false,
        value: "",
        placeholder: "",
        multiple: false,
        name: "",
        autoComplete: "on",
        renderOption: (option: Option) => option.label,
        renderGroupHeader: (title: string) => title,
        renderValue: (label: string) => label
    }
    constructor(props: Props) {
        super(props);

        this.showSearch = props.alwaysShowSearch || props.options.length > 5;

        const option = this.findOptionByValue(props.options, props.value);

        this.state = {
            searchTerm: option ? option.label : "",
            value: props.value,
            focus: false,
            filteredOptions: props.options,
            highlighted: null
        };

        this.search = null;
        this.container = null;
        this.valueInput = null;
        this.select = null;
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (this.state.focus && this.state.focus !== prevState.focus) {
            this.handleFocus();
        }
    }

    onKeyDown = (e: KeyboardEvent) => {
        if (!this.state.focus) {
            return;
        }

        /** Tab */
        if (e.keyCode === 9) {
            this.onBlur();
            return;
        }

        /** Arrow Down */
        if (e.keyCode === 40) {
            this.handleArrowDown();
        }

        /** Arrow Up */
        if (e.keyCode === 38) {
            this.handleArrowUp();
        }
    };

    onKeyUp = (e: KeyboardEvent) => {
        /** Esc */
        if (e.keyCode === 27) {
            this.handleEsc();
        }
    };

    handleArrowDown() {
        if (this.state.filteredOptions.length < 1) {
            return;
        }

        let highlighted = null;

        if (this.state.highlighted != null) {
            highlighted = this.state.highlighted + 1;
        } else {
            highlighted = 0;
        }

        if (highlighted > this.state.filteredOptions.length - 1) {
            highlighted = 0;
        }

        this.setState({ highlighted });
    }

    handleArrowUp() {
        if (this.state.filteredOptions.length < 1) {
            return;
        }

        let highlighted = this.state.filteredOptions.length - 1;

        if (this.state.highlighted != null) {
            highlighted = this.state.highlighted - 1;
        }

        if (highlighted < 0) {
            highlighted = this.state.filteredOptions.length - 1;
        }

        this.setState({ highlighted });
    }

    handleEnter() {
        this.selectOption();
    }

    handleEsc() {
        this.onBlur();
    }

    handleFocus() {
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keypress', this.onKeyPress);
        document.addEventListener('keyup', this.onKeyUp);

        if (this.state.filteredOptions.length > 0 && !this.props.multiple) {
            const element = this.select;

            if (!element) return;

            const { clientHeight } = document.documentElement;
            const viewportHeight = Math.max(clientHeight, window.innerHeight || 0);
            const elementPos = element.getBoundingClientRect();
            const selectHeight = viewportHeight - elementPos.top - 20;

            element.style.maxHeight = `${selectHeight}px`;

            // this.scrollToSelected(true, 'selected');
        }
    }

    findOptionByValue(options: Array<Option>, value: string) {
        return options.find((o: Option) => o.value === value);
    }

    onFocus = () => {
        this.setState({ focus: true, searchTerm: "", filteredOptions: this.props.options });
    };

    onBlur = () => {
        let search = '';

        if (this.state.value && this.showSearch && !this.props.multiple) {
            const option = this.findOptionByValue(this.props.options, this.state.value);

            if (option) {
                search = option.label;
            }
        }

        this.setState({ focus: false, searchTerm: search });
    };

    toggle = () => {
        if (this.state.focus) {
            this.onBlur();
        } else {
            this.onFocus();
        }
    };

    onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value || "";
        const filteredOptions = this.filterOptions(this.props.options, value);

        this.setState({ searchTerm: value, filteredOptions });
    };

    onKeyPress = (e: React.KeyboardEvent | KeyboardEvent) => {
        if (!this.state.filteredOptions || this.state.filteredOptions.length < 1) {
            return;
        }

        if (e.keyCode === 13) {
            this.selectOption();
        }
    };

    filterOptions(options: Array<Option>, value: string) {
        if (options && options.length > 0 && value && value.length > 0) {
            const fuse = new Fuse(options, {
                keys: ["label"],
                threshold: 0.3
            });

            return fuse.search(value).map((item, index) => Object.assign({}, item, { index }));
        }

        return options;
    }

    renderValueInput() {
        if (this.showSearch) {
            return (
                <input
                    type="hidden"
                    autoComplete={this.props.autoComplete}
                    defaultValue={this.state.value}
                    ref={element => { this.valueInput = element }}
                    name={this.props.name}
                />
            );
        } else {
            const style: React.CSSProperties = {
                opacity: 0,
                position: "absolute",
                top: "-9999px",
                left: "-9999px"
            };

            return (
                <input
                    type="text"
                    autoComplete={this.props.autoComplete}
                    onFocus={this.onFocus}
                    style={style}
                    value={this.state.value}
                    readOnly
                    ref={el => { this.valueInput = el; }}
                    name={this.props.name}
                />
            );
        }
    }

    renderSearchField() {
        return (
            <input
                name={name}
                autoComplete={this.props.autoComplete}
                ref={el => { this.search = el; }}
                onFocus={this.onFocus}
                onKeyPress={this.onKeyPress}
                className={bemE("search")}
                type="search"
                value={this.state.searchTerm}
                onChange={this.onSearchTermChange}
                placeholder={this.props.placeholder}
            />
        );
    }

    renderChosenOption() {
        const classnames = classNames({
            [bemE("search")]: true,
            [bem.m(bemE("search"), "placeholder")]: !this.state.value
        });
        const option = this.findOptionByValue(this.props.options, this.state.value)
        const label = !option ? this.props.placeholder : option.label;

        return (
            <div role="button" onClick={this.toggle} className={classnames}>
                {this.props.renderValue(label, option)}
            </div>
        );
    }

    getHighlighedOption() {
        let index = this.state.highlighted;

        if (!index || (this.state.filteredOptions.length - 1) < index) {
            index = 0;
        }

        return this.state.filteredOptions[index];
    }

    selectOption(option?: Option) {
        const chosenOption = option || this.getHighlighedOption();

        const value = chosenOption.value;
        const searchTerm = chosenOption.label;

        this.setState({
            value,
            searchTerm,
            filteredOptions: this.props.options,
            focus: false
        });

        setTimeout(() => {
            this.props.onSelection && this.props.onSelection.call(null, chosenOption);
        }, 50);
    }

    renderOption(option: Option) {
        const classes = classNames({
            [bemE("option")]: true,
            [bem.m(bemE("option"), "highlighted")]: this.state.highlighted != null && this.state.filteredOptions[this.state.highlighted].value === option.value
        });

        return (
            <li
                role="menuitem"
                className={classes}
                key={`${option.value}-option`}
                onClick={() => this.selectOption(option)}
            >
                {this.props.renderOption(option)}
            </li>
        );
    }

    renderOptions(options: Array<Option>) {
        const renderedOptions = options.map(option => {
            if (Array.isArray(option.options)) {
                return (
                    <li className="row" key={option.value}>
                        <div className="group">
                            <div className="group-header">
                                {this.props.renderGroupHeader(option.label)}
                            </div>
                            {this.renderOptions(option.options)}
                        </div>
                    </li>
                );
            } else {
                return this.renderOption(option);
            }
        });
        const optionList = renderedOptions.length ? (
            <ul className={bemE("options")}>
                {renderedOptions}
            </ul>
        ) : null;

        const classes = classNames({
            [bemE("select")]: true,
            [bem.m(bemE("select"), "show")]: this.state.focus
        });

        return (
            <div ref={el => { this.select = el; }} className={classes}>
                {optionList}
            </div>
        );
    }

    render() {
        const classnames = classNames({
            [`${namespace}--select`]: true
        });

        return (
            <div className={classnames} ref={el => { this.container = el; }}>
                {this.renderValueInput()}
                {this.showSearch
                    ? this.renderSearchField()
                    : this.renderChosenOption()}
                {this.renderOptions(this.state.filteredOptions)}
            </div>
        );
    }
}
