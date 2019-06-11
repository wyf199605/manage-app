import * as React from "react";
import "./style.scss";
import {CheckBoxGroup} from "./group";

export interface ICheckBoxProps {
    name?: string; // 设置checkBox的name属性
    value?: any; // 设置checkBox的value属性，仅在group中使用
    indeterminate?: boolean; // 部分选中状态，仅在受控状态下使用
    defaultChecked?: boolean; // 默认选中状态，受控状态下无效
    checked?: boolean; // 选中值，开启受控状态
    disabled?: boolean; // 是否不可点击
    onChange?: React.ChangeEventHandler<HTMLInputElement>; // 状态改变时触发
}

interface ICheckBoxState {
    checked: boolean;
}

export class CheckBox extends React.Component<ICheckBoxProps, ICheckBoxState>{

    static Group = CheckBoxGroup;

    static defaultProps:Partial<ICheckBoxProps> = {
        defaultChecked: false,
        disabled: false,
        indeterminate: false
    };

    protected _controlled: boolean;

    constructor(props: ICheckBoxProps){
        super(props);
        this._controlled = typeof props.checked !== 'undefined';
        this.state = {
            checked: props.defaultChecked
        };
        if(this._controlled && typeof props.onChange !== 'function'){
            throw new Error('受控CheckBox组件必须传入onChange参数');
        }
    }

    checkedHandler(e: React.ChangeEvent<HTMLInputElement>) {
        let onChange = this.props.onChange,
            checked = e.target.checked;
        this.setState({
            checked: checked
        });
        onChange && onChange(e);
    }

    render(){
        let disabled = this.props.disabled,
            name = this.props.name,
            indeterminate = this.props.indeterminate,
            checked = this._controlled ? this.props.checked : this.state.checked;

        return <label
            className="checkbox-wrapper"
            data-name={name}
            data-disabled={disabled}
            data-checked={checked}
            data-indeterminate={this._controlled && indeterminate}
        >
            <span className="checkbox">
                <input
                    name={name}
                    type="checkbox"
                    disabled={disabled}
                    checked={checked}
                    onChange={(e) => this.checkedHandler(e)}
                />
                <span className="checkbox-inner"/>
            </span>
            <span className="checkbox-text">{this.props.children}</span>
        </label>;
    }
}

