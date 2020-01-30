import * as React from "react";
import "./filter.scss";
import { SearchInput } from "../search-input/search-input";
import { Tag } from "../tag/tag";
import { bem } from "../bem";
import onClickOutside from "react-onclickoutside";

const MODULE_BEM_BASE = "bz--filter";
const bemE = bem.e(MODULE_BEM_BASE);
const bemM = bem.m(MODULE_BEM_BASE);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    filters?: { [key: string]: any };
    onChangeEvent?: Function;
}

interface State {
    showFilters: boolean;
    selectedFilters: Array<string>;
    dropdownList?: Array<string>;
    searchTerm: string;
    keydown: number;
}

class FilterComponent extends React.Component<Props> {
    state: State = {
        showFilters: false,
        selectedFilters: [],
        dropdownList: [],
        searchTerm: "",
        keydown: 0
    };

    componentWillMount() {
        const filters = this.props.filters;

        const list = filters ? Object.keys(filters).map(e => e) : [];
        this.setState({
            dropdownList: list
        });
    }

    handleClickOutside = () => {
        this.onBlur();
    };

    onBlur = () => {
        this.setState({ showFilters: false, keydown: 0 });
    };

    toggleFilters(flag: boolean) {
        this.setState({
            showFilters: flag,
            keydown: 0
        });
    }

    handleClick(
        e: string,
        dropdownList: Array<string>,
        selectedFilters: Array<string>,
        key: number
    ) {
        selectedFilters.push(e);

        const index = dropdownList.indexOf(e);
        dropdownList.splice(index, 1);

        if (typeof this.props.onChangeEvent === "function") {
            this.props.onChangeEvent(selectedFilters);
        }

        if (key - 1 === dropdownList.length) {
            key -= 1;
        }

        this.setState({
            selectedFilters: selectedFilters,
            dropdownList: dropdownList,
            keydown: key,
            searchTerm: ""
        });
    }

    onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        const dropdown = this.state.dropdownList ? this.state.dropdownList : [];

        let key = this.state.keydown;

        if (e.keyCode === 40) {
            this.setState({
                keydown: dropdown.length === key ? 0 : key + 1
            });
        }

        if (e.keyCode === 38) {
            this.setState({
                keydown: key === 0 ? dropdown.length : key - 1
            });
        }

        if (e.key === "Enter") {
            if (dropdown.length > 0 && key !== 0) {
                this.handleClick(
                    dropdown[key - 1],
                    dropdown,
                    this.state.selectedFilters,
                    key
                );
            }
        }

        if (e.key === "Backspace") {
            if (this.state.searchTerm === "") {
                const filters = this.state.selectedFilters;
                filters.pop();
                this.setState({
                    selectedFilters: filters
                });
                if (typeof this.props.onChangeEvent === "function") {
                    this.props.onChangeEvent(filters);
                }
            }
        }
    }

    showFilters(dropdownList: Array<string>, selectedFilters: Array<string>) {
        const init = this.props.filters ? this.props.filters : {};
        const arr = Object.keys(init).filter((e: string) =>
            dropdownList.includes(e)
        );

        return arr.map((e, index) => {
            return (
                <li
                    className={`${bemE("filter-option")} ${
                        index + 1 === this.state.keydown ? "bz--selected" : ""
                    }
                    `}
                    onClick={() => {
                        e
                            ? this.handleClick(
                                  e,
                                  dropdownList,
                                  selectedFilters,
                                  100
                              )
                            : "";
                    }}
                >
                    {e ? (
                        <span className={bemE("filter-text")}>{init[e]}</span>
                    ) : (
                        ""
                    )}
                </li>
            );
        });
    }

    search(
        search: string,
        dropdownList: Array<string>,
        selectedFilters: Array<string>
    ) {
        const init = this.props.filters || {};

        const result = Object.keys(init)
            .filter(e => !selectedFilters.includes(e))
            .filter(e => {
                const reg = RegExp(search.toLowerCase(), "g");
                return init[e].toLowerCase().match(reg);
            });
        this.setState({
            dropdownList: result,
            searchTerm: search,
            selectedFilters: selectedFilters
        });
    }

    renderTags(dropdownList: Array<string>, selectedFilters: Array<string>) {
        const filters = this.props.filters || {};
        return selectedFilters.map(e => {
            const props = {
                content: filters[e],
                closeButton: true,
                closeEvent: (c: string) => {
                    const index = selectedFilters.indexOf(e);
                    selectedFilters.splice(index, 1);
                    dropdownList.push(e);

                    if (typeof this.props.onChangeEvent === "function") {
                        this.props.onChangeEvent(selectedFilters);
                    }

                    this.setState({
                        selectedFilters,
                        dropdownList
                    });
                }
            };
            return <Tag {...props}></Tag>;
        });
    }

    render() {
        const dropdownList = this.state.dropdownList;
        const selectedFilters = this.state.selectedFilters;
        const showFilter = this.state.showFilters;
        const props = {
            id: "filterSearch",
            trailingIcon: "icon-dropdown",
            placeHolder: selectedFilters.length < 1 ? "Filters" : "",
            onFocusEvent: (e: string) => {
                this.toggleFilters(true);
            },
            onTypeEnd: (
                v: string,
                e: React.KeyboardEvent<HTMLInputElement>
            ) => {
                dropdownList && selectedFilters
                    ? e.keyCode === 40 || e.keyCode === 38 || e.key === "Enter"
                        ? null
                        : this.search(v, dropdownList, selectedFilters)
                    : null;
            },
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                dropdownList && selectedFilters ? this.onKeyDown(e) : null;
            }
        };

        return dropdownList && selectedFilters ? (
            <div className={`${MODULE_BEM_BASE}`}>
                <div className={bemE("tag-container")}>
                    <div className={bemE("tag")}>
                        {this.renderTags(dropdownList, selectedFilters)}
                    </div>
                </div>
                <SearchInput {...props} />

                {showFilter ? (
                    dropdownList.length > 0 ? (
                        <ul className={bemE("options")}>
                            {this.showFilters(dropdownList, selectedFilters)}
                        </ul>
                    ) : null
                ) : null}
            </div>
        ) : null;
    }
}

export const Filter = onClickOutside(FilterComponent);
