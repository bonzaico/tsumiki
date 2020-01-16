import * as React from "react";
import { settings } from "../settings";
import "./filter.scss";
import { SearchInput } from "../search-input/search-input";
import { Tag } from "../tag/tag";
import {bem} from "../bem"

const MODULE_BEM_BASE = "bz--filter";
const bemE = bem.e(MODULE_BEM_BASE);
const bemM = bem.m(MODULE_BEM_BASE);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    filters?: Object;
    onChangeEvent?: Function;
}

interface State {
    showFilters: boolean;
    selectedFilters: Array<string>;
    dropdownList?: Array<string>;
    initialDropdownList?: { [key: string]: any };
    searchTerm: string;
}


export class Filter extends React.Component<Props> {
    state: State = {
        showFilters: false,
        selectedFilters: [],
        dropdownList: [],
        searchTerm: "",
        initialDropdownList: this.props.filters
    };

    componentWillMount() {
        const filters = this.props.filters;

        const list = filters ? Object.keys(filters).map(e => e) : [];
        this.setState({
            dropdownList: list
        });
    }

    toggleFilters(flag: boolean) {
        this.setState({
            showFilters: flag
        });
    }

    showFilters(init: { [key: string]: any },dropdownList: Array<string>,selectedFilters: Array<string>) {

        return Object.keys(init).map((e: string) => {
                  return (
                    dropdownList.includes(e)?
                      <li
                          className={bemE("filter-option")}
                          onClick={() => {
                              selectedFilters.push(e);

                              const index = dropdownList.indexOf(e);
                              dropdownList.splice(index, 1);

                              if (typeof this.props.onChangeEvent === "function") {
                                this.props.onChangeEvent(selectedFilters);
                              }

                              this.setState({
                                  selectedFilters: selectedFilters,
                                  dropdownList: dropdownList
                              });
                          }}
                      >
                          <span className={bemE("filter-text")}>{init[e]}</span>
                      </li>:null
                  );
              })
    }

    search(search: string , init: { [key: string]: any },dropdownList: Array<string>,selectedFilters: Array<string>) {
        let result;

        if (search == "") {
          if (this.state.searchTerm == "") {
            selectedFilters.pop();
            if (typeof this.props.onChangeEvent === "function") {
              this.props.onChangeEvent(selectedFilters);
          }
        }

            result =Object.keys(init).filter(e => {
                      return !selectedFilters.includes(e);
                  })
                
        } else {
            result = dropdownList.filter(e => {
                      const reg = RegExp(search, "g");

                      return init[e].match(reg);
                  })
        }
        this.setState({
            dropdownList: result,
            searchTerm: search,
            selectedFilters: selectedFilters
        });
    }

    renderTags(init: { [key: string]: any },dropdownList: Array<string>,selectedFilters: Array<string>) {

        return selectedFilters.map(e => {
                  const props = {
                      content: init[e],
                      closeButton: true,
                      closeEvent: (c: string) => {
                          const index = selectedFilters.indexOf(e);
                          selectedFilters.splice(index, 1);
                          dropdownList.push(e)
                        
                          if (typeof this.props.onChangeEvent === "function") {
                            this.props.onChangeEvent(selectedFilters);
                        }

                          this.setState({
                              selectedFilters: selectedFilters,
                              dropdownList: dropdownList
                          });
                      }
                  };
                  return <Tag {...props}></Tag>;
              })
    }

    render() {
        const init = this.state.initialDropdownList;
        const dropdownList = this.state.dropdownList;
        let selectedFilters = this.state.selectedFilters;
        const showFilter = this.state.showFilters;
        const props = {
            id: "filterSearch",
            trailingIcon:"fa fa-caret-down",
            placeHolder: "",
            onFocusEvent: (e: string) => {
                this.toggleFilters(true);
            },
            onTypeEnd: (e: string) => {
                init && dropdownList && selectedFilters ? this.search(e,init,dropdownList,selectedFilters):null;
            }
        };
        
        return (
          init && dropdownList && selectedFilters ?
                <div className={`${MODULE_BEM_BASE}`}>
                  <div>
                    <div className={bemE("tag")}>{this.renderTags(init,dropdownList,selectedFilters)}</div>
                  </div>
                    <SearchInput {...props} />
            
            {showFilter ? 
                <ul className={bemE("options")}>
                    {this.showFilters(init,dropdownList,selectedFilters)}
                    </ul>:null}
            
            </div>:null
                
        );
    }
}