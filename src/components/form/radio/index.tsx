import * as React from "react";
import "./style.scss";
import {RadioGroup} from "./group";
import {BasicBox} from "../basicBox";

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
        let {
            children,
            disabled,
            checked: propsChecked,
            name
        } = this.props;

        let classNames = ['radio-wrapper'],
            checked = this._controlled ? propsChecked : this.state.checked;

        return <BasicBox
            type="radio"
            className={classNames.join(' ')}
            checked={checked}
            disabled={disabled}
            name={name}
            onChange={(e) => this.checkedHandler(e)}
        >
            {children}
        </BasicBox>;
    }
}
