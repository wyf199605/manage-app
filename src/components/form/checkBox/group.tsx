import * as React from "react";
import {JSXElementConstructor} from "react";
import {ReactNode} from "react";
import {CheckBox, ICheckBoxProps} from "./index";

type CheckBoxNode = React.ReactElement<
ICheckBoxProps & Readonly<{ children?: ReactNode }>,
JSXElementConstructor<ICheckBoxProps & Readonly<{ children?: ReactNode }>>
>;

interface ICheckBoxGroupProps {
    children?: CheckBoxNode | CheckBoxNode[];
    name?: string; // 设置CheckBox name属性
    layout?: "horizontal" | "vertical"; // 布局方式，水平or垂直，默认水平
    disabled?: boolean; // 是否不可点击
    defaultValues?: string[]; // 默认选中值，在受控状态下无效
    values?: string[]; // 选中值，开启受控状态
    onChange?: (values: string[]) => void; // 值改变时触发
}

interface ICheckBoxGroupState {
    values: string[];
}

export class CheckBoxGroup extends React.Component<ICheckBoxGroupProps, ICheckBoxGroupState> {
    static defaultProps: Partial<ICheckBoxGroupProps> = {
        layout: 'horizontal',
        defaultValues: []
    };

    protected _controlled: boolean;

    constructor(props: ICheckBoxGroupProps){
        super(props);
        this._controlled = typeof props.values !== 'undefined';
        this.state = {
            values: props.defaultValues
        };

        if(this._controlled && typeof props.onChange !== 'function'){
            throw new Error('受控CheckBoxGroup组件必须传入onChange参数');
        }
    }

    toggleNameHandler(value: string){
        let values = this.state.values,
            onChange = this.props.onChange,
            isAppend = values.find((item) => item === value);

        values = isAppend
            ? values.filter((item) => item !== value)
            : values.concat(value);

        this.setState({
            values
        });
        onChange && onChange(values);
    }

    renderCheckBoxes(): React.ReactNode[]{
        let disabled = this.props.disabled,
            values = this._controlled ? this.props.values : this.state.values;

        return React.Children.map<React.ReactNode, CheckBoxNode>(this.props.children, (child) => {
            if(typeof child === 'object' && child.type.name === CheckBox.name){
                let props = child.props,
                    value = props.value,
                    name = props.name;
                if(typeof value !== 'string'){
                    throw new Error('Checkbox在CheckBoxGroup中必须有value参数!');
                }
                return <CheckBox
                    key={child.key}
                    disabled={typeof disabled === 'undefined' ? props.disabled : disabled}
                    checked={!!~values.indexOf(value)}
                    name={name}
                    value={value}
                    onChange={() => {
                        this.toggleNameHandler(value);
                    }}
                >
                    {props.children}
                </CheckBox>;
            }else{
                return null;
            }
        });
    }

    render(){
        return <div className="check-box-group-wrapper" data-layout={this.props.layout}>
            {this.renderCheckBoxes()}
        </div>;
    }
}
