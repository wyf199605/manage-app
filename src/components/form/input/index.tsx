import * as React from "react";
import "./style.scss";
import {Textarea} from "./textarea";
import {validateControlled} from "../validateControlled";
import {IMenuItemProps} from "../../view/menu/item";


export interface IInputProps {
    value?: string;
    defaultValue?: string;
    type?: "text" | "password";
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

interface IInputState {
    value: string;
    focus: boolean;
}

export class Input extends React.Component<IInputProps, IInputState>{
    static Textarea = Textarea;

    private readonly _controlled: boolean;

    constructor(props: IInputProps){
        super(props);
        this._controlled = 'value' in props;
        this.state = {
            value: props.defaultValue,
            focus: false
        };

        validateControlled(this);
    }

    static defaultProps: Partial<IInputProps> = {
        defaultValue: '',
        disabled: false,
        type: 'text',
        placeholder: ''
    };

    changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {onChange} = this.props;
        this.setState({
            value: e.target.value
        });
        onChange && onChange(e);
    };

    keyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.keyCode !== 13){
            return ;
        }
        let onEnter = this.props.onEnter;

        onEnter && onEnter(e);
    };

    render(){
        let {
            placeholder,
            disabled,
            prefixIcon,
            suffixIcon,
            type,
            readOnly
        } = this.props;

        let value = this._controlled ? this.state.value : this.props.value;

        return <div
            className="input-wrapper"
            data-input-focus={this.state.focus}
            data-input-disabled={disabled}
            data-input-readonly={readOnly}
        >
            {prefixIcon ? <span className="input-prefix-icon input-icon">
                {prefixIcon}
            </span> : null}
            {suffixIcon ? <span className="input-suffix-icon input-icon">
                {suffixIcon}
            </span> : null}
            <input
                className="input" type={type} value={value} readOnly={readOnly}
                disabled={disabled} placeholder={placeholder}
                onChange={this.changeHandler}
                onKeyUp={this.keyUpHandler}
                onFocus={() => this.setState({focus: true})}
                onBlur={() => this.setState({focus: false})}
            />
        </div>;
    }
}
