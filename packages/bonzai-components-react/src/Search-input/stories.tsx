import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SearchInput } from ".";

storiesOf("Search input", module)
    .add("Default", () => {
        const props = {
            id: "brand-search",
            value: "",
            placeHolder: "Search for brands"
        };
        return (
            <SearchInput {...props} />
        );
    })
    .add("Type end", () => {
        const props = {
            id: "brand-search",
            value: "",
            placeHolder: "Search for brands",
            onTypeEnd: action("onTypeEnd")
        };
        return (
            <SearchInput {...props} />
        );
    })
    .add("With clear icon", () => {
        const props = {
            id: "brand-search",
            value: "",
            placeHolder: "Search for brands",
            onTypeEnd: action("onTypeEnd"),
            onClear: action("onClear")
        };
        return (
            <SearchInput {...props} />
        );
    })
    .add("With search icon in the beginning", () => {
        const props = {
            id: "brand-search",
            value: "",
            placeHolder: "Search for brands",
            onTypeEnd: action("onTypeEnd"),
            leadingIcon: "icon-search"
        };
        return (
            <SearchInput {...props} />
        );
    })
    .add("With autosuggest", () => {
        const suggestions = ["random", "text"];
        interface State {
            searchTerm: string
        };
        class AutoSuggest extends React.Component<{}, State> {
            state: State = {
                searchTerm: ""
            };

            render() {
                let props = {
                    id: "brand-search",
                    value: "",
                    placeHolder: "Search for brands",
                    onTypeEnd: (searchTerm: string) => {
                        this.setState({
                            searchTerm: searchTerm
                        })
                    },
                    autoSuggest: true,
                    suggestions: [],
                    onSearch: action("onSearch")
                };
                const propsWithSuggestions = {
                    ...props,
                    suggestions
                };
                return <div>
                    <div className="bz--col-4">
                        <SearchInput {...(this.state.searchTerm ? propsWithSuggestions : props)} />
                    </div>
                </div>
            }
        };

        return (
            <AutoSuggest />
        );
    });
