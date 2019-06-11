import * as React from "react";
import "./style.scss";
import {RadioGroup} from "./group";

export interface IRadioProps {
    name?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
    value?: any;
}

interface IRadioState {
    checked: boolean;
}

export class Radio extends React.Component<IRadioProps, IRadioState>{
    static defaultProps: Partial<IRadioProps> = {
        disabled: false,
        defaultChecked: false
    };

    static Group = RadioGroup;

    protected _controlled;

    constructor(props: IRadioProps){
        super(props);
        this._controlled = typeof props.checked !== 'undefined';
        this.state = {
            checked: props.defaultChecked
        };
    }

    checkedHandler(e: React.ChangeEvent<HTMLInputElement>){
        let onChange = this.props.onChange;
        this.setState({
            checked: e.target.checked
        });
        onChange && onChange(e);
    }

    render(){
        let checked = this._controlled ? this.props.checked : this.state.checked,
            name = this.props.name,
            disabled = this.props.disabled;

        return <label
            className="radio-wrapper"
            data-disabled={disabled}
            data-checked={checked}
            data-name={name}
        >
            <span className="radio">
                <input
                    name={name}
                    type="radio"
                    disabled={disabled}
                    checked={checked}
                    onChange={(e) => this.checkedHandler(e)}
                />
                <span className="radio-inner"/>
            </span>
            <span className="radio-text">{this.props.children}</span>
        </label>;
    }
}
