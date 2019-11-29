import * as React from "react";
import classNames from "classnames";
import { settings } from "../settings";
import { debounce } from "../utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    id: string,
    value: string,
    errorMsg: string,
    label?: string,
    placeHolder?: string,
    className?: string,
    inline?: boolean,
    leadingIcon?: string,
    trailingIcon?: string,
    validate?: RegExp,
    onTypeEnd?: Function
};

interface DefaultProps {
    placeHolder: string,
    label: ""
}

interface State {
    value: string,
    isInvalid: boolean
};

const namespace = settings.namespace;

export class TextInput extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        placeHolder: "Enter Text",
        label: ""
    };
    state: State = {
        value: this.props.value,
        isInvalid: false
    };

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.value !== this.state.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    validate = (value: string, pattern?: RegExp) => {
        if (!pattern) return true;
        return value.search(pattern) !== -1;
    };

    execute = (e: React.KeyboardEvent<HTMLInputElement>, validate?: RegExp) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        e.persist();
        if (e.keyCode === 27) {
            this.setState({
                value: this.props.value
            });
            return false;
        }

        const typeEnd = this.props.onTypeEnd;
        if (typeof typeEnd === "function") {
            (debounce(() => {
                const isInvalid = !this.validate(value, validate);
                this.setState({
                    isInvalid
                });
                if (!isInvalid) typeEnd(e);
            }, 500))();
        } else if (typeof this.props.onKeyDown === "function") {
            const isInvalid = !this.validate(value, validate);
            this.setState({
                isInvalid
            });
            if (!isInvalid) this.props.onKeyDown(e);
        }
    }

    onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        this.execute(e, this.props.validate);
    };

    onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        this.setState({
            isInvalid: false,
            value: this.state.isInvalid ? this.props.value : this.state.value
        }, () => {
            if (typeof this.props.onBlur === "function") {
                this.props.onBlur(e);
            }
        });
    }

    onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const isInvalid = !this.validate(value, this.props.validate);
        this.setState({
            value,
            isInvalid
        });
        if (
            typeof this.props.onChange === "function"
            && value !== this.state.value
            && !isInvalid
        ) {
            this.props.onChange(e);
        }
    }

    render() {
        const { id, leadingIcon, trailingIcon, className, label, placeHolder, errorMsg, inline, validate } = this.props;
        const { isInvalid, value } = this.state;
        const showError =
            validate
                ? isInvalid && errorMsg
                : errorMsg;
        const inputClasses = classNames({
            [`${namespace}--input`]: true,
            [`${namespace}--input__invalid`]: isInvalid,
            [`${this.props.className}`]: className,
            [`${namespace}--input__leadingicon`]: leadingIcon,
            [`${namespace}--input__trailingicon`]: trailingIcon,
        });
        const wrapperClasses = classNames({
            [`${namespace}--input-wrapper`]: true,
            [`${namespace}--input-wrapper__inline`]: inline,
            [`${namespace}--input-wrapper__invalid`]: isInvalid,
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
            <label htmlFor={id} className={`${namespace}--input-name`}>{label}</label>
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
                    onFocus={(e) => e.target.select()}
                    onKeyUp={(e) => e.preventDefault()}
                ></input>
                { trailingIcon ? <span className={trailingIconClasses}></span> : null }
            </div>
            {showError ? <div className="bz--input-error-msg">{errorMsg}</div> : null}
          </div>
        );
    }
}
